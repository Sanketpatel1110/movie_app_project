import React from 'react';
import './App.css';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import toastNotification from './components/toast';
import LoadingSpinner from './components/backdrop';

let API_KEY = "apikey=484ddb5";
let BASE_URL = "https://www.omdbapi.com/"

let main_url = BASE_URL+"/?i=tt3896198&"+API_KEY

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted:false,
      isLoading: true,
      activeItem: {
        title: "",
        description: "",
        completed: ""
      },
      activeMovie: {
        'Actors': "", 
        'Awards': "",
        'BoxOffice': "",
        'Country': "",
        'DVD': "",
        'Director': "",
        'Genre': "",
        'Language': "",
        'Metascore': "",
        'Plot': "",
        'Poster': "",
        'Production': "",
        'Rated': "",
        'Ratings': "",
        'Released': "",
        'Response': "",
        'Runtime': "",
        'Title': "",
        'Type': "",
        'Website': "",
        'Writer': "",
        'Year': "",
        'imdbID': "",
        'imdbRating': "",
        'imdbVotes': "",
        'isSaved': ""
      },
      taskList: [],
      savedMovieList: [],
    }
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };


  componentDidMount() {
    this.refreshList();
    this.savedMovieListApi();
  }


  refreshList = () => {
    axios
      .get(main_url)
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err))
    setTimeout(() => this.setState({isLoading: false}), 1000)
  }

  savedMovieListApi = () => {
    axios
      .get("http://localhost:8000/api/savedmovies/")
      .then(res => this.setState({ savedMovieList: res.data }))
      .catch(err=> console.log(err) )
  }


  // toggle = () => {
  //   this.setState({modal: !this.state.modal});
  // };

  // handleSubmit = item => {
  //   this.toggle()
  //   if(item.id) {
  //     axios
  //       .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
  //       .then(res => this.refreshList())
  //   }
  //   axios
  //     .post("http://localhost:8000/api/tasks/", item)
  //     .then(res => this.refreshList())
  // };

  handleSaved = item => {
    const responseMovieData = this.state.taskList

    responseMovieData.Ratings = ""
    responseMovieData.isSaved = true

    if((this.state.savedMovieList.length) <= 4) {
      axios
        .post("http://localhost:8000/api/savedmovies/", responseMovieData)
        .then(res => {
          this.refreshList()
          this.savedMovieListApi();
        })
        .then(toastNotification("Movie added to savedmovies", "savemovie"))
    }
    else {
      toastNotification("Your Saved List is Full. (Max:5)", "fulllist", true)
    }
  }

  /// Searching functionality
  setSearch = text => {
    axios
      .get(`${BASE_URL}/?t=${text}&plot=full&${API_KEY}`)
      .then(res => {
        if(res.data.Title !== undefined) {
          this.setState({ taskList: res.data })
        }
        else if(res.data.Title === undefined && text.length > 0) {
          this.setState({ taskList: [] })
        }
        else if(res.data.Title === undefined) {
          this.refreshList()
        }
      })
      .catch(err => console.log(err))

  }

  logout = (e) => {
    const { cookies } = this.props;

    cookies.remove('mytoken');
    window.location.href = '/';
    toastNotification("Logout successful")
  }

  
  renderCards = () => {
    const movieData = this.state.taskList;
    var alreadySaved = false

    const databaseMoviesList = this.state.savedMovieList

    if(databaseMoviesList.length !== 0) {
      for(var i=0; i < databaseMoviesList.length; i++) {
        if(databaseMoviesList[i].Title === movieData.Title) {
          alreadySaved = true
          break
        }
      }
    }

    return(
      movieData.length !== 0 
      ? <>
            <div className='movie'>
                <img src={movieData.Poster} alt={movieData.Title} className='poster'></img>
                <button className='rating text-white' activemovie = {this.state.activeMovie} onClick={() => alreadySaved ? toastNotification("Movie is already saved", "saveprior", true) : this.handleSaved()}>{alreadySaved ? <FaBookmark /> : <FaRegBookmark />}</button>
                <div className='movie-details'>
                    <div className='box'>
                      <div>
                        <h4 className='title text-white'>{movieData.Title}</h4>
                        <p>Year of release: {movieData.Year}</p>
                      </div>
                    </div>
                    <div className='overview'>
                        {movieData.Plot}
                    </div>
                </div>
            </div>
        </>
      : <>
        <h3 className='text-center text-white'>There isn't any movie</h3>
      </>
    )
  }



  render() {
    return (
      <main>
      <div className='content p-4 mb-2 bg-dark' style={{minHeight: window.innerHeight}}>
        {this.state.isLoading 
        ? <LoadingSpinner />
        : 
        <>
          <div className='topContainer'>
            <h1 className='text-white text-uppercase text-center my-4' style={{display: "inline"}}>Movie App</h1>
            
            <div className='searchContainer'>
              <Link className="nav-link active text-black my-4 savedmovietext" to='/savedmovies'>Saved Movies</Link>
              <form>
                <div className="search-btn  my-4">
                    <input type="text" placeholder="&#128269; Enter Movie Name" 
                    className="inputText searchInput" 
                    onChange={(e)=>{this.setSearch(e.target.value)}} 
                    >
                    </input>
                </div>
              </form>

              <button className="nav-link active text-black logout-btn my-4" onClick={this.logout}>Log out</button>

            </div>
          </div>
          
          <div className='row'>
            <div className='col-md-10 col-sma-10 mx-auto p-0'>
              <div className='wrap'>
              
              { this.renderCards()}
              </div>
              

              {/* <div className='card p-3'>
                <div>
                  <button onClick={this.createItem} className='btn btn-warning'>Add Task</button>
                </div>
                {this.renderTabList()}
                <ul className='list-group list-group-flush'>
                  {this.renderItems()}
                </ul>
              </div> */}
            </div>
          </div>
          <footer className='mb-0 text-white text-center footer'>Copyright 2023 &copy; All Rights reserved</footer>
        </>
        }
        <ToastContainer/>
        </div>
      </main>  
    )
  }

}







export default withCookies(App);
// export default App;
