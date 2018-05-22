import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
//Redux
import { setCurrentUser, logoutUser, fetchUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import store from "./store";
import PropTypes from "prop-types";
//Components
import Navbar from "./components/layout/Nav/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfileNew from "./components/create-profile/CreateProfileNew";
import EditProfile from "./components/edit-profile/EditProfile";
import EditProfilePicture from "./components/create-profile/AddProfilePicture";
import AddExperience from "./components/add-credentials/AddExperience";
import Login from "./components/auth/Login";
import "./App.css";
import bgPattern from "./img/svg/topography.svg";
//Styled Components
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #f9f9f9;
  background-image: url(${bgPattern});
`;

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
} else {
  store.dispatch(fetchUser());
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Wrapper>
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route
                  exact
                  path="/create-profile"
                  component={CreateProfileNew}
                />
                <Route exact path="/edit-profile" component={EditProfile} />
                <Route
                  exact
                  path="/profile-picture"
                  component={EditProfilePicture}
                />
                <Route exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Footer>
                <p>Film-It &copy; {new Date().getFullYear()}</p>
              </Footer>
            </Wrapper>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
