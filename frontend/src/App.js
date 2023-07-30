import React from 'react';
import './App.css';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { FaRegBookmark } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import toastNotification from './components/toast';

let API_KEY = "apikey=484ddb5";
let BASE_URL = "https://www.omdbapi.com/"

let main_url = BASE_URL+"/?i=tt3896198&"+API_KEY

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted:false,
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
    }
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };


  componentDidMount() {
    this.refreshList();
  }


  refreshList = () => {
    axios
      .get(main_url)
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err))
  }


  toggle = () => {
    this.setState({modal: !this.state.modal});
  };

  handleSubmit = item => {
    this.toggle()
    if(item.id) {
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList())
    }
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList())
  };

  handleSaved = item => {
    // this.toggle()
    console.log("he")
    const movieData = this.state.activeMovie
    const responseMovieData = this.state.taskList
    movieData.Actors= this.state.taskList.Actors

    responseMovieData.Ratings = ""
    responseMovieData.isSaved = true
    console.log(responseMovieData)

    // this.setState( {activeMovie[Actors]: this.state.taskList})
    
    axios
      .post("http://localhost:8000/api/savedmovies/", responseMovieData)
      .then(res => this.refreshList())
  }

  handleDelete = item => {
    axios
        .delete(`http://localhost:8000/api/tasks/${item.id}/`)
        .then(res => this.refreshList())
  }

  /// Searching functionality
  setSearch = text => {
    console.log(`texttt: ${text}`)
    axios
      .get(`${BASE_URL}/?t=${text}&plot=full&${API_KEY}`)
      .then(res => {
        console.log(res.data.Title);
        console.log(res.data);
        if(res.data.Title !== undefined) {
          this.setState({ taskList: res.data })
        }
        else if(res.data.Title === undefined && text.length > 0) {
          this.setState({ taskList: [] })
        }
        else if(res.data.Title === undefined) {
          // this.setState({ taskList: [] })
          this.refreshList()
        }
      })
      .catch(err => console.log(err))

  }

  createItem = () => {
    const item = {title: "", modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal})
  }

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  displayCompleted = status => {
    if(status) {
      return this.setState({viewCompleted: true})
    }
    return this.setState({viewCompleted: false})
  }
  
  // renderTabList = () => {
  //   return (
  //     <div className='my-5 tab-list'>
  //       <span
  //         onClick={() => this.displayCompleted(true)}
  //         className={this.state.viewCompleted ? "active" : ""}
  //       >
  //         Completed
  //       </span>

  //       <span 
  //         onClick={() => this.displayCompleted(false)}
  //         className={this.state.viewCompleted ? "" : "active"}
  //       >
  //         Incompleted
  //       </span>

  //     </div>
  //   )
  // }

  logout = (e) => {
    const { cookies } = this.props;

    cookies.remove('mytoken');
    window.location.href = '/';
    toastNotification("Logout successful")
    // return false;
  }

  
  renderCards = () => {
    const movieData = this.state.taskList;
    return(
      // <Card info={this.state.taskList}/>
      movieData.length !== 0 
      ? <>
            <div className='movie'>
                <img src={movieData.Poster} alt={movieData.Title} className='poster'></img>
                <button className='rating text-white' activemovie = {this.state.activeMovie} onClick={this.handleSaved}><FaRegBookmark /></button>
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
        <h1 className='text-white'>No Such Movies</h1>
      </>
    )
  }

  // Rendering Items in List
  // renderItems = () => {
  //   // const{ viewCompleted } = this.state;
  //   // const newItems = this.state.taskList.filter(
  //   //   item => item.completed === viewCompleted
  //   // );

  //   return (
  //     <>
  //       <ul>
  //         <li>{this.state.taskList.Title}</li>
  //       </ul>
  //     </>
  //   );

  //   // return this.state.taskList.map(item => (
  //   // // return newItems.map(item => (
  //   // // return this.state.movieList.map(item => (
  //   //   <li key={item.id}
  //   //     className='list-group-item d-flex justify-content-between align-items-center'>
  //   //     <span className={`movie-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
  //   //     title={item.title}>
  //   //       {item.title}
  //   //     </span>

  //   //     <span>
  //   //       <button onClick={() => this.editItem(item)} className='btn btn-info mr-2' style={{marginRight: "5px"}}>Edit</button>
  //   //       <button onClick={() => this.handleDelete(item)} className='btn btn-danger mr-2'>Delete</button>
  //   //     </span>
  //   //   </li>
  //   // ))

  // };

  



  render() {
    return (
      <main className='content p-4 mb-2 bg-dark' style={{minHeight: window.innerHeight}}>
        <div className='topContainer'>
          <h1 className='text-white text-uppercase text-center my-4' style={{display: "inline"}}>Movie App</h1>
          
          <div className='searchContainer' style={{justifyContent: "space-between"}}>
            <Link className="nav-link active text-white my-4 savedmovietext" to='/savedmovies'>Saved Movies</Link>
            <form>
              <div className="search-btn  my-4">
                  <input type="text" placeholder="&#128269; Enter Movie Name" 
                  className="inputText searchInput" 
                  onChange={(e)=>{this.setSearch(e.target.value)}} 
                  >
                  </input>
              </div>
            </form>

            <button className="nav-link active text-white" onClick={this.logout}>Log out</button>

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
        <footer className='my-5 mb-2 text-white text-center'>Copyright 2023 &copy; All Rights reserved</footer>
        {/* {this.state.modal ? (
          <Modal activeItem = {this.state.activeItem} toggle = {this.toggle} onSave={this.handleSubmit}/>
        )
        : null}  */}
        <ToastContainer/>
      </main>  
    )
  }

}







export default withCookies(App);
// export default App;
