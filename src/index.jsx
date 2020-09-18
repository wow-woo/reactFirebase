import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { fb_init } from "./server/firebaseAPI";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
