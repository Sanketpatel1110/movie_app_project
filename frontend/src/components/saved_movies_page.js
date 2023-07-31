import React, { useState } from "react";
import toastNotification from "./toast";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { ToastContainer } from 'react-toastify'
import axios from "axios";
import { Cookies } from "react-cookie";

function SavedMovies() {
  const [taskList, setTaskList] = useState([]);

  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/savedmovies/")
      .then((res) => setTaskList(res.data))
      .catch((err) => console.log(err));
  };

  useState(() => {
    const initialData = refreshList();
    return initialData;
  });

  const handleSaved = (item) => {
    const movieData = this.state.activeMovie;
    const responseMovieData = this.state.taskList;
    movieData.Actors = this.state.taskList.Actors;

    responseMovieData.Ratings = "";
    responseMovieData.isSaved = true;
    console.log(responseMovieData);

    // this.setState( {activeMovie[Actors]: this.state.taskList})

    axios
      .post("http://localhost:8000/api/savedmovies/", responseMovieData)
      .then((res) => this.refreshList());
  };

  const handleDelete = item => {
    axios
        .delete(`http://localhost:8000/api/savedmovies/${item.id}/`)
        .then(res => {
          toastNotification("Movie removed from savedmovies", "removemovie")
          refreshList()
        })
  }

  const renderCards = () => {
    const movieData = taskList;
    return (
      // <Card info={this.state.taskList}/>
      movieData.length !== 0 ? (
        movieData.map((item) => 
        <>
              <div className="movie">
                <img
                  src={item.Poster}
                  key={item.Poster}
                  alt={item.Title}
                  className="poster"
                ></img>
                <button
                  className="rating text-white"
                  activemovie={movieData}
                  onClick={() => {item.isSaved ? handleDelete(item) : handleSaved()}}
                  // onClick={item.isSaved ? handleDelete : handleSaved }
                >
                  {item.isSaved ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                <div className="movie-details">
                  <div className="box" key={item}>
                    <div>
                      <h4 className="title text-white" key={item.Title}>{item.Title}</h4>
                      <p key={item.Year}>Year of release: {item.Year}</p>
                    </div>
                  </div>
                  <div className="overview" key={item.Plot}>{item.Plot}</div>
                </div>
              </div>
            </>
        // { item.isSaved == false ? (
        //     <>
        //       <div className="movie">
        //         <img
        //           src={item.Poster}
        //           alt={item.Title}
        //           className="poster"
        //         ></img>
        //         <button
        //           className="rating text-white"
        //           activemovie={movieData}
        //           onClick={handleSaved}
        //         >
        //           <FaRegBookmark />
        //         </button>
        //         <div className="movie-details">
        //           <div className="box">
        //             <div>
        //               <h4 className="title text-white">{item.Title}</h4>
        //               <p>Year of release: {item.Year}</p>
        //             </div>
        //           </div>
        //           <div className="overview">{item.Plot}</div>
        //         </div>
        //       </div>
        //     </>
        //   ) : (
        //     <>
        //       <div className="movie">
        //         <img
        //           src={item.Poster}
        //           alt={item.Title}
        //           className="poster"
        //         ></img>
        //         <button
        //           className="rating text-white"
        //           activemovie={movieData}
        //           onClick={handleSaved}
        //         >
        //           <FaBookmark />
        //         </button>
        //         <div className="movie-details">
        //           <div className="box">
        //             <div>
        //               <h4 className="title text-white">{item.Title}</h4>
        //               <p>Year of release: {item.Year}</p>
        //             </div>
        //           </div>
        //           <div className="overview">{item.Plot}</div>
        //         </div>
        //       </div>
        //     </>
        //   );
        // }
        )
      ) : (
        <>
          <h1 className="text-white">No Such Movies</h1>
        </>
      )
    );
  };

  const logout = (e) => {
    const cookies = new Cookies()
    
    cookies.remove("mytoken");
    window.location.href = "/";
    toastNotification("Logout successful");
    // return false;
  };

  return (
    <main
      className="content p-4 mb-2 bg-dark"
      style={{ minHeight: window.innerHeight }}
    >
      <div className="topContainer">
        <h1
          className="text-white text-uppercase text-center my-4"
          style={{ display: "inline" }}
        >
          Saved Movies
        </h1>

        <div
          className="searchContainer"
          style={{ justifyContent: "space-between" }}
        >
          {/* <Link className="nav-link active text-white my-4 savedmovietext" to='/savedmovies'>Saved Movies</Link> */}
          {/* <form>
              <div className="search-btn  my-4">
                  <input type="text" placeholder="&#128269; Enter Movie Name" 
                  className="inputText searchInput" 
                  onChange={(e)=>{this.setSearch(e.target.value)}} 
                  >
                  </input>
              </div>
            </form> */}

          <button className="nav-link active text-black logout-btn my-4" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-10 col-sma-10 mx-auto p-0">
          <div className="wrap">{renderCards()}</div>

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
      <footer className="my-5 mb-2 text-white text-center">
        Copyright 2023 &copy; All Rights reserved
      </footer>
      <ToastContainer/>
    </main>
  );
}

export default SavedMovies;
