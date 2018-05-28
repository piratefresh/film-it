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
    const { profile } = this.props;
    return (
      <ProfileDetails>
        <h3>{profile && profile.user ? profile.user.name : ""}</h3>
        <p>
          {profile.role} @ {isEmpty(profile.company) ? null : profile.company}
        </p>
        <p>
          Location:{" "}
          <strong>
            {profile.city}, {profile.state}
          </strong>
        </p>
        {isEmpty(profile.website) ? null : (
          <Link href={profile.website} target="_blank">
            <i className="fas fa-cubes" />
          </Link>
        )}
        <ProfileSocial>
          {/* Twitter */}
          {isEmpty(profile.social && profile.social.twitter) ? null : (
            <Link href={profile.social.twitter} target="_blank">
              <i className="fab fa-twitter-square fa-2x" />
            </Link>
          )}
          {/* Facebook */}
          {isEmpty(profile.social && profile.social.facebook) ? null : (
            <Link href={profile.social.facebook} target="_blank">
              <i className="fab fa-facebook-square fa-2x" />
            </Link>
          )}
          {/* Instagram */}
          {isEmpty(profile.social && profile.social.instagram) ? null : (
            <Link href={profile.social.instagram} target="_blank">
              <i className="fab fa-instagram fa-2x" />
            </Link>
          )}
          {/* Linkedin */}
          {isEmpty(profile.social && profile.social.linkedin) ? null : (
            <Link href={profile.social.linkedin} target="_blank">
              <i className="fab fa-linkedin fa-2x" />
            </Link>
          )}
          {/* Youtube */}
          {isEmpty(profile.social && profile.social.youtube) ? null : (
            <Link href={profile.social.youtube} target="_blank">
              <i class="fab fa-youtube-square fa-2x" />
            </Link>
          )}
        </ProfileSocial>
      </ProfileDetails>
    );
  }
}

export default ProfileHeader;
