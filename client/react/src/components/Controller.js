import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Dashboard from "./Dashboard";


import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./utils/Common";

function Controller() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    // fetch(`http://localhost:5000/api/v1/users/login`)
    //   .then((response) => {
    //     setUserSession(response.data.token, response.data.user);
    //     setAuthLoading(false);
    //   })
    //   .catch((error) => {
    removeUserSession();
    setAuthLoading(false);
    //       });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <BrowserRouter>
      <div>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
          <small>(Access without token only)</small>
          <NavLink activeClassName="active" to="/signup">
            Signup
          </NavLink>
          <small>(Access with token only)</small>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signup" component={Signup} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Controller;
