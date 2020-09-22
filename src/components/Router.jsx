import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

export default function Router({ refreshAuth, currentUser, isLoggedIn }) {
  return (
    <HashRouter>
      <Navigation isLoggedIn={isLoggedIn} currentUser={currentUser} />
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home currentUser={currentUser} />
            </Route>

            <Route exact path='/profile'>
              <Profile currentUser={currentUser} refreshAuth={refreshAuth} />
            </Route>
          </>
        ) : (
          <Route exact path='/'>
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
}
