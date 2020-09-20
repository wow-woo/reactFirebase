import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

export default function Router({ currentUser, isLoggedIn }) {
  return (
    <HashRouter>
      <Navigation isLoggedIn={isLoggedIn} />
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home currentUser={currentUser} />
            </Route>

            <Route exact path='/profile'>
              <Profile />
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
