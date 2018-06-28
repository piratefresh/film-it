import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
//Redux
import {
  setCurrentUser,
  logoutUser,
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
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
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
import Messenger from "./components/real-time-messaging/Messenger";
import MessageWindow from "./components/real-time-messaging/MessageWindow";
import Navbar from "./components/layout/Nav/Navbar";
import Landing from "./components/layout/Landing";
//Layouts
import AppRoute from "./components/layout/AppRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import LandingLayout from "./components/layout/LandingLayout";
import MainLayout from "./components/layout/MainLayout";
// Styling
import "./App.css";
import "normalize.css";
import bgPattern from "./img/svg/topography.svg";
//Styled Components
import styled from "styled-components";
import getCookie from "./components/common/CheckCookie";

const Container = styled.div`
  margin: 5% auto;
  width: 1000px;
  height: 100%;
  @media (max-width: 1000px) {
    width: 90%;
    margin: 0 auto;
  }
  @media (max-width: 600px) {
  }
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
    const { profile, loading } = this.props.profile;
    let handle;
    if (profile === null || loading) {
    } else {
      handle = profile.handle;
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <AppRoute
              exact
              path="/"
              layout={LandingLayout}
              component={Landing}
            />
            <AppRoute
              exact
              path="/register"
              layout={MainLayout}
              component={Register}
            />
            <AppRoute
              exact
              path="/login"
              layout={MainLayout}
              component={Login}
            />
            <AppRoute
              exact
              path="/profiles"
              layout={MainLayout}
              component={Profiles}
            />
            <AppRoute
              exact
              path="/profile/:handle"
              layout={MainLayout}
              component={Profile}
            />
            <AppRoute
              exact
              path="/feed"
              layout={MainLayout}
              component={Posts}
            />
            <PrivateRoute
              exact
              path="/dashboard"
              layout={MainLayout}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path="/inbox"
              layout={MainLayout}
              component={Messenger}
            />
            <PrivateRoute
              exact
              path="/inbox/:id"
              layout={MainLayout}
              component={MessageWindow}
            />
            <PrivateRoute
              exact
              path="/inbox/profile/:handle"
              layout={MainLayout}
              component={Messenger}
            />
            <PrivateRoute
              exact
              path="/create-profile"
              layout={MainLayout}
              component={CreateProfileNew}
            />
            <PrivateRoute
              exact
              path="/edit-profile"
              layout={MainLayout}
              component={EditProfile}
            />
            <PrivateRoute
              exact
              path="/profile-picture"
              layout={MainLayout}
              component={EditProfilePicture}
            />
            <PrivateRoute
              exact
              path="/add-experience"
              layout={MainLayout}
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path="/profile-gallery"
              layout={MainLayout}
              component={EditGalleryPictures}
            />
            <PrivateRoute
              exact
              path="/post/:id"
              layout={MainLayout}
              component={Post}
            />
            <PrivateRoute
              exact
              path="/edit-post/:id"
              component={EditPostForm}
            />
            <PrivateRoute
              exact
              path="/applications/:id"
              layout={MainLayout}
              component={Applications}
            />
            <PrivateRoute
              exact
              path="/add-post"
              layout={MainLayout}
              component={PostForm}
            />
            <AppRoute layout={MainLayout} component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(App);
