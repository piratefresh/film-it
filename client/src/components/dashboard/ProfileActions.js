import React from "react";
import styled from "styled-components";
//Styled Components
import Button from "../common/Button";
import Link from "../common/Link";

const ProfileActions = () => {
  return (
    <div>
      <Link href="/edit-profile">
        <Button>Edit Profile</Button>
      </Link>
      <Link>
        <Button onClick={this.onDeleteClick.bind(this)}>
          Delete My Account
        </Button>
      </Link>
    </div>
  );
};

export default ProfileActions;
