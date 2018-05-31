import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import styled from "styled-components";
import Link from "../common/Link";
import Button from "../common/Button";

const ProfileCard = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 15%;
  margin-left: 10%;
  width: 280px;
  height: 320px;
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
  h4 {
    color: #7d48df;
  }
`;
const SkillContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 3% 0;
`;
const List = styled.li`
  list-style: none;
`;

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <ProfileCard>
        <CardHeader>
          <img src={profile.avatar} alt="" srcset="" />
        </CardHeader>
        <CardContent>
          <Link href={`/profile/${profile.handle}`}>
            <h4 style={{ margin: "2% 0" }}>{profile.user.name}</h4>
          </Link>
          <p>
            <strong>Role: </strong>
            {profile.role}{" "}
            {isEmpty(profile.company) ? null : <span>@ {profile.company}</span>}
          </p>
          <p>
            <strong>Location: </strong>
            {isEmpty(profile.city) ? null : <span>{profile.city}</span>},
            {isEmpty(profile.state) ? null : <span> {profile.state}</span>}
          </p>
          <SkillContainer>
            Skills:
            {profile.skills
              .slice(0, 4)
              .map((skill, index) => <List key={index}>{skill}</List>)}
          </SkillContainer>
          <Link href={`/profile/${profile.handle}`}>
            <Button>View Profile</Button>
          </Link>
        </CardContent>
      </ProfileCard>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
