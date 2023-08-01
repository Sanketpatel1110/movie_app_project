import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import APIService from "./APIService";
import toastNotification from "./toast";
import { ToastContainer } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  let navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);

  useEffect(() => {
    var user_token = token["mytoken"];
    console.log("Login User token is", user_token);
    console.log("datatype ", typeof token["mytoken"]);

    if (String(user_token) === "undefined") {
      navigate("/");
    } else {
      navigate("/tasks");
    }
  }, [token, navigate]);

  const loginBtn = () => {
    if (username.trim().length !== 0 && password.trim().length) {
      console.log("username and pass are set");
      APIService.LoginUser({ username, password })
        .then((resp) => {
          setToken("mytoken", resp.token);
          toastNotification("Login Successful", "login");
        })
        .catch((error) => toastNotification(error, "loginerr", true));
    } else {
      toastNotification(
        "Username and password are not set",
        "loginvalidation",
        true
      );
      navigate("/");
    }
  };

  const RegisterBtn = () => {
    if (username.trim().length !== 0 && password.trim().length !== 0) {
      console.log("Username and password are set");
      APIService.RegisterUser({ username, password })
        .then(() => loginBtn())
        .catch((error) => console(error));
      toastNotification("User Successful Register", "register");
    } else {
      navigate("/");
      toastNotification(
        "Username and password are not set",
        "registervalidation",
        true
      );
    }
  };

  const loginStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + "img/18.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "77vh",
    backgroundPosition: " center",
    margin: 0,
  };

  return (
    <div className="bg-dark" style={{ minHeight: window.innerHeight }}>
      <div className="container">
        <div className="container-fluid">
          <div className="row">
            <h1 className="text-white text-uppercase text-center my-4">
              Movie app
            </h1>

            <div className="col-md-5 col-sma-10 mx-auto p-0 text-white" style={{marginTop: 50}}>
              {isLogin ? (
                <h3 className="text-center">Please Login Here</h3>
              ) : (
                <h3 className="text-center">Please Register Here</h3>
              )}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  value={username}
                  className="form-control"
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <br />

              <div>
                {isLogin ? (
                  <div className="align-center">
                    <button onClick={loginBtn} className="loginbtn">
                      Login
                    </button>
                    <p>If You Don't Have Account, Please</p>
                    <button
                      onClick={() => setLogin(false)}
                      className="btn btn-primary"
                    >
                      Register
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={RegisterBtn} className="loginbtn">
                      Register
                    </button>
                    <p>
                      If You Have Account, Please{" "}
                      <button
                        className="btn btn-primary"
                        onClick={() => setLogin(true)}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-8 full-img" style={loginStyle}></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
