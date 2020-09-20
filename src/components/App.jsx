import React, { useEffect, useState } from "react";
import Router from "./Router";
import { fb_auth } from "../server/firebaseAPI.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fb_auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);

        setCurrentUser(user);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : (
    <Router isLoggedIn={isLoggedIn} currentUser={currentUser} />
  );
}

export default App;
