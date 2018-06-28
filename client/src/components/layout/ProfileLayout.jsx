import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "../common/PrivateRoute";
import Navbar from "./Nav/Navbar";
import Footer from "./Footer";
// Components
import Profile from "../profile/Profile";
import CreateProfileNew from "../create-profile/CreateProfileNew";
import EditProfile from "../edit-profile/EditProfile";
import EditGalleryPictures from "../edit-profile/EditProfileGallery";
import EditProfilePicture from "../create-profile/AddProfilePicture";
import AddExperience from "../add-credentials/AddExperience";
//Styled Components
import styled from "styled-components";

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

class ProfileLayout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/profile/:handle" component={Profile} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfileNew}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
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
          </Switch>
        </Container>
        <Footer>
          <p>Film-It &copy; {new Date().getFullYear()}</p>
        </Footer>
      </div>
    );
  }
}

export default connect()(ProfileLayout);
