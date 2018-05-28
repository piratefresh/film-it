import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import styled from "styled-components";
import Button from "../common/Button";

const ProfileDesc = styled.div`
  padding: 4%;
  color: rgb(75, 75, 75);
`;
const ProfileBio = styled.div`
  margin-bottom: 5%;
`;

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    // Skills
    let skills = "";
    if (profile.skills && profile.skills.length > 0) {
      skills = profile.skills.map((skill, index) => (
        <div key={index} className="profile-skills">
          <Button style={{ background: "#fdca1e" }}>{skill}</Button>
        </div>
      ));
    }
    return (
      <ProfileDesc>
        <ProfileBio>
          <p>
            {isEmpty(profile.bio)
              ? "Sadly there is no description about " +
                (profile && profile.user ? profile.user.name : "")
              : profile.bio}
          </p>
        </ProfileBio>
        <h4>Skills:</h4>
        {skills}
      </ProfileDesc>
    );
  }
}

export default ProfileAbout;
