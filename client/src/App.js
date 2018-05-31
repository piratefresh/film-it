import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
//Redux
import {
  setCurrentUser,
  logoutUser,
  fetchUser,
  loginGoogleUser
} from "./actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "./actions/profileActions";
import store from "./store";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Components
import Navbar from "./components/layout/Nav/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Inbox from "./components/messages/Inbox";
import CreateProfileNew from "./components/create-profile/CreateProfileNew";
import EditProfile from "./components/edit-profile/EditProfile";
import EditGalleryPictures from "./components/edit-profile/EditProfileGallery";
import EditProfilePicture from "./components/create-profile/AddProfilePicture";
import AddExperience from "./components/add-credentials/AddExperience";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import PostForm from "./components/posts/PostForm";
import EditPostForm from "./components/posts/EditPostForm";
import Post from "./components/post/Post";
import Applications from "./components/post/Applications";
import Login from "./components/auth/Login";
// Styling
import "./App.css";
import "normalize.css";
import bgPattern from "./img/svg/topography.svg";
//Styled Components
import styled from "styled-components";
import getCookie from "./components/common/CheckCookie";

const Wrapper = styled.div`
  background-color: #f9f9f9;
  background-image: url(${bgPattern});
`;
const Container = styled.div`
  margin: 5% auto;
  width: 1000px;
  height: 100%;
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
  if (getCookie("jwtToken")) {
    store.dispatch(loginGoogleUser());
    // Decode token and get user info and exp
    const decoded = jwt_decode(getCookie("jwtToken"));
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
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h1 className="text-center">Four oh Four.</h1>
    <p>Sorry page dosen't exist</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Wrapper>
            <Navbar />
            <Container>
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Route exact path="/feed" component={Posts} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/inbox" component={Inbox} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfileNew}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/profile-picture"
                  component={EditProfilePicture}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/profile-gallery"
                  component={EditGalleryPictures}
                />
                <PrivateRoute exact path="/post/:id" component={Post} />
                <PrivateRoute
                  exact
                  path="/edit-post/:id"
                  component={EditPostForm}
                />
                <PrivateRoute
                  exact
                  path="/applications/:id"
                  component={Applications}
                />
                <PrivateRoute exact path="/add-post" component={PostForm} />
                <Route component={NoMatch} />
              </Switch>
            </Container>
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
