import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
//Redux
import { setCurrentUser, logoutUser, fetchUser } from "./actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "./actions/profileActions";
import store from "./store";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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

//LOGGED IN CHECKS
const auth = {
  isAuthenticated: false
};
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

const NoMatch = ({ location }) => (
  <h1 className="text-center">Four oh Four.</h1>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Wrapper>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfileNew}
                />
              </Switch>
              <Route exact path="/edit-profile" component={EditProfile} />
              <Route
                exact
                path="/profile-picture"
                component={EditProfilePicture}
              />
              <Route exact path="/add-experience" component={AddExperience} />
              <Route component={NoMatch} />
            </Switch>
            <Footer>
              <p>Film-It &copy; {new Date().getFullYear()}</p>
            </Footer>
          </Wrapper>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(App);
