import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
//Styled Components
import Button from "../common/Button";
import Anchor from "../common/Link";

const ProfileActions = () => {
  return (
    <div>
      <Anchor href="/edit-profile">
        <Button style={{ margin: "3%" }}>Edit Profile</Button>
      </Anchor>
      <Anchor href="add-experience">
        <Button>Add Experience</Button>
      </Anchor>
    </div>
  );
};

export default ProfileActions;
