import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
// Redux
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileActions";
// Styled Components
import styled from "styled-components";

const ContainerProfiles = styled.div`
  height: 100%;
  margin: 10% 0;
  display: flex;
  flex-wrap: wrap;
`;
const ProfileCard = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 15%;
  margin-left: 10%;
  width: 300px;
  height: 100%;
  background: #fff;
  padding: 2%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
`;
const CardHeader = styled.div`
  position: relative;
  height: 200px;
  > img {
    height: 300px;
    width: 270px;
    object-fit: cover;
    position: absolute;
    top: -112px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const CardContent = styled.div`
  position: relative;
  clear: both;
  font-size: 0.8rem;
`;

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Profiles found...</h4>;
      }
    }
    return <ContainerProfiles>{profileItems}</ContainerProfiles>;
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
