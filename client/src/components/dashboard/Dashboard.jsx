import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import styled from "styled-components";
import ProfileActions from "./ProfileActions";
// Styled Components
import Button from "../common/Button";
import Link from "../common/Link";

const ContainerDashboard = styled.div`
  height: 100%;
  padding: 5% 5%;
  background: #fff;
  margin-top: 5%;
  display: grid;
  grid-template-areas:
    "title title title"
    "details posts posts"
    "exp exp exp"
    "reel reel reel";
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
`;

const DashboardTitle = styled.div`
  grid-area: title;
  margin-bottom: 5%;
`;

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p>
              Welcome{" "}
              <Link href={`/profile/${profile.handle}`}> {user.name} </Link>{" "}
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }}>
              <Link>
                <Button onClick={this.onDeleteClick.bind(this)}>
                  Delete My Account
                </Button>
              </Link>
            </div>
          </div>
        );
      } else {
        // User is logged in but not profile
        dashboardContent = (
          <div>
            <p>Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link href="/create-profile">
              <Button href="/create-profile">Create Profile</Button>
            </Link>
          </div>
        );
      }
    }

    return (
      <ContainerDashboard>
        <DashboardTitle>{dashboardContent}</DashboardTitle>
      </ContainerDashboard>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
