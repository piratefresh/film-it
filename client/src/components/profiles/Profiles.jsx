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
  @media (max-width: 1000px) {
    margin-top: 20%;
  }
  @media (max-width: 600px) {
    margin-top: 30%;
  }
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

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
