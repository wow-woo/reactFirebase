import React, { useEffect, useState } from "react";
import Router from "./Router";
import { fb_auth } from "../server/firebaseAPI.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fb_auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  return loading ? <div>loading...</div> : <Router isLoggedIn={isLoggedIn} />;
}

export default App;
