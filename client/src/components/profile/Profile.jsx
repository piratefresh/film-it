import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileGallery from "./ProfileGallery";
import ProfileCreds from "./ProfileCreds";
//Redux
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileActions";
// Styled Components
import styled from "styled-components";
import Spinner from "../common/Spinner";
import Button from "../common/Button";
import Link from "../common/Link";

const ProfileContainer = styled.div`
  height: 100%;
  background: #fff;
  margin-top: 5%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
`;
const ProfileAvatar = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

class Profile extends Component {
  componentDidMount() {
    // Check for the handle in the url
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <Link href="/profiles">
            <Button>Back to Profiles</Button>
          </Link>
          <ProfileContainer>
            <ProfileAvatar src={profile.avatar} />
            <div className="profile-content">
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
            </div>
          </ProfileContainer>
          <ProfileGallery gallery={profile.gallery} />
          <ProfileCreds experience={profile.experience} />
        </div>
      );
    }
    return <div>{profileContent}</div>;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
