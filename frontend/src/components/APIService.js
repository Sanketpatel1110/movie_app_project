import toastNotification from "./toast";

export default class APISerive {

  static LoginUser(body) {
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => 
      resp.status === 200 ? resp.json() : toastNotification("Something went wrong", "loginerr", true)
      
    );
  }

  static RegisterUser(body) {
    return fetch(`http://127.0.0.1:8000/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => 
      resp.status === 200 ? resp.json() : toastNotification("Something went wrong", "loginerr", true)
    );
  }
}
