import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain="digay.us.auth0.com"
      clientId="MnWhGdGGEaz8XGtphA0QGXrEVP8YLMOH"
      redirectUri={window.location.origin + "/authenticate"}
    >
      {/* {console.log(window.location.origin)} */}
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);
