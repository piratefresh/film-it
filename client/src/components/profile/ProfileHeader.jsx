import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import styled from "styled-components";
import Link from "../common/Link";

const ProfileDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-top: 5%;

  ::after {
    content: "";
    display: block;
    margin: 0 auto;
    width: 50%;
    padding-top: 10px;
    border-bottom: 3px solid #7d48df;
  }

  h3 {
    font-weight: 600;
    font-size: 1.5em;
    color: #7d48df;
  }
  p {
    padding-top: 2%;
    color: #7d48df;
  }
`;
const ProfileSocial = styled.div`
  padding-top: 2%;
  color: #7d48df;
`;

class ProfileHeader extends Component {
  render() {
    const { profileHandle } = this.props;
    return (
      <ProfileDetails>
        <h3>
          {profileHandle && profileHandle.user ? profileHandle.user.name : ""}
        </h3>
        <p>
          {profileHandle.role} @{" "}
          {isEmpty(profileHandle.company) ? null : profileHandle.company}
        </p>
        <p>
          Location:{" "}
          <strong>
            {profileHandle.city}, {profileHandle.state}
          </strong>
        </p>
        {isEmpty(profileHandle.website) ? null : (
          <Link href={profileHandle.website} target="_blank">
            <i className="fas fa-cubes" />
          </Link>
        )}
        <ProfileSocial>
          {/* Twitter */}
          {isEmpty(
            profileHandle.social && profileHandle.social.twitter
          ) ? null : (
            <Link href={profileHandle.social.twitter} target="_blank">
              <i className="fab fa-twitter-square fa-2x" />
            </Link>
          )}
          {/* Facebook */}
          {isEmpty(
            profileHandle.social && profileHandle.social.facebook
          ) ? null : (
            <Link href={profileHandle.social.facebook} target="_blank">
              <i className="fab fa-facebook-square fa-2x" />
            </Link>
          )}
          {/* Instagram */}
          {isEmpty(
            profileHandle.social && profileHandle.social.instagram
          ) ? null : (
            <Link href={profileHandle.social.instagram} target="_blank">
              <i className="fab fa-instagram fa-2x" />
            </Link>
          )}
          {/* Linkedin */}
          {isEmpty(
            profileHandle.social && profileHandle.social.linkedin
          ) ? null : (
            <Link href={profileHandle.social.linkedin} target="_blank">
              <i className="fab fa-linkedin fa-2x" />
            </Link>
          )}
          {/* Youtube */}
          {isEmpty(
            profileHandle.social && profileHandle.social.youtube
          ) ? null : (
            <Link href={profileHandle.social.youtube} target="_blank">
              <i class="fab fa-youtube-square fa-2x" />
            </Link>
          )}
        </ProfileSocial>
      </ProfileDetails>
    );
  }
}

export default ProfileHeader;
