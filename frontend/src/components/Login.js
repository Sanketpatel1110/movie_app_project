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

    if (String(user_token) === "undefined") {
      navigate("/");
    } else {
      navigate("/tasks");
    }
  }, [token, navigate]);

  const loginBtn = () => {
    if (username.trim().length !== 0 && password.trim().length) {
      APIService.LoginUser({ username, password })
        .then((resp) => {
          toastNotification("Login Successful", "login");
          setToken("mytoken", resp.token);
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
          <div>
            <h1 className="text-white text-uppercase text-center my-4">
              Movie app
            </h1>

            <div
              className="col-md-5 col-sma-4 mx-auto p-0 text-white"
              style={{ marginTop: 50 }}
            >
              {isLogin ? (
                <h3 className="text-center">Login</h3>
              ) : (
                <h3 className="text-center">Create Account</h3>
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
                {isLogin 
                ? (
                  <div className="loginbtndiv">
                    <button onClick={loginBtn} className="loginbtn">
                      Login
                    </button>
                    <p>
                      If You Don't Have Account, 
                      <button
                        onClick={() => setLogin(false)}
                        className="linkbtn"
                      >
                        Register Here
                      </button>
                    </p>
                  </div>
                ) 
                : (
                  <div className="loginbtndiv">
                    <button onClick={RegisterBtn} className="loginbtn">
                      Register
                    </button>
                    <p>
                      If You Have Account, Please{" "}
                      <button
                        className="linkbtn"
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
