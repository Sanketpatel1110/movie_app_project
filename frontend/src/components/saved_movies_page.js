import React, { useState } from "react";
import toastNotification from "./toast";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Cookies } from "react-cookie";
import LoadingSpinner from "./backdrop";

function SavedMovies() {
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/savedmovies/")
      .then((res) => setTaskList(res.data))
      .catch((err) => console.log(err));
    setTimeout(() => setLoading(false), 1000);
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

    // this.setState( {activeMovie[Actors]: this.state.taskList})

    axios
      .post("http://localhost:8000/api/savedmovies/", responseMovieData)
      .then((res) => this.refreshList());
  };

  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/savedmovies/${item.id}/`)
      .then((res) => {
        toastNotification("Movie removed from savedmovies", "removemovie");
        refreshList();
      });
  };

  const renderCards = () => {
    const movieData = taskList;
    return (
      movieData.length !== 0 ? (
        movieData.map((item) => (
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
                onClick={() => {
                  item.isSaved ? handleDelete(item) : handleSaved();
                }}
              >
                {item.isSaved ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <div className="movie-details">
                <div className="box" key={item}>
                  <div>
                    <h4 className="title text-white" key={item.Title}>
                      {item.Title}
                    </h4>
                    <p key={item.Year}>Year of release: {item.Year}</p>
                  </div>
                </div>
                <div className="overview" key={item.Plot}>
                  {item.Plot}
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <>
          <h3 className="text-white text-center">Saved Movie is Empty</h3>
        </>
      )
    );
  };

  const logout = (e) => {
    const cookies = new Cookies();

    cookies.remove("mytoken");
    window.location.href = "/";
    toastNotification("Logout successful");
  };

  return (
    <main>
      <div
        className="content p-4 mb-2 bg-dark"
        style={{ minHeight: window.innerHeight }}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
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
                <button
                  className="nav-link active text-black logout-btn my-4"
                  onClick={logout}
                >
                  Log out
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-10 col-sma-10 mx-auto p-0">
                <div className="wrap">{renderCards()}</div>
              </div>
            </div>

            <ToastContainer />
            <footer className="mb-0 text-white text-center footer">
              Copyright 2023 &copy; All Rights reserved
            </footer>
          </>
        )}
      </div>
    </main>
  );
}

export default SavedMovies;
