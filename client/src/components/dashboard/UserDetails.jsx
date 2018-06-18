import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Styled Components
import styled from "styled-components";
import Link from "../common/Link";

const UserDetailsContainer = styled.div`
  margin: 0 auto;
  padding: 0 3%;
  h3 {
    text-align: center;
  }
  p {
    text-align: center;
    margin: 5% 0;
  }
  @media (max-width: 650px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const UserDetailText = styled.div`
  @media (max-width: 650px) {
    padding: 0 3%;
  }
`;
const DetailImg = styled.img`
  border-radius: 5%;
  height: 150px;
  width: 100%;
  object-fit: cover;
  @media (max-width: 650px) {
    height: 150px;
    width: 150px;
  }
`;

class UserDetails extends Component {
  render() {
    const profile = this.props.profile;
    const user = this.props.user;
    return (
      <UserDetailsContainer>
        <DetailImg src={profile.avatar} />
        <UserDetailText>
          <Link href={`/profile/${profile.handle}`}>
            <h3>{user.name}</h3>
          </Link>
          <p>
            {profile.role}{" "}
            {profile.company === null ? "" : " @ " + profile.company}
          </p>
        </UserDetailText>
      </UserDetailsContainer>
    );
  }
}

export default connect(null)(UserDetails);
