import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Styled Components
import styled from "styled-components";
import Link from "../common/Link";

const UserDetailsContainer = styled.div`
  &:after {
    content: "";
    display: block;
    margin: 3% 0;
    border-bottom: 3px solid #7d48df;
  }
`;
const DetailImg = styled.img`
  border-radius: 10%;
  height: 128px;
  width: 128px;
  object-fit: cover;
`;

class UserDetails extends Component {
  render() {
    const profile = this.props.profile;
    const user = this.props.user;
    return (
      <UserDetailsContainer>
        <DetailImg src={profile.avatar} />
        <Link href={`/profile/${profile.handle}`}>
          <h3>{user.name}</h3>
        </Link>
        <p>
          {profile.role}{" "}
          {profile.company === null ? "" : " @ " + profile.company}
        </p>
      </UserDetailsContainer>
    );
  }
}

export default connect(null)(UserDetails);
