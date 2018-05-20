import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import styled from "styled-components";

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
const Button = styled.button`
  padding: 5px;
  background: #7d48df;
  color: #fff;
  border: none;
`;
const Link = styled.a`
  text-decoration: none;
`;

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
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
        dashboardContent = <h4>Display profile</h4>;
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
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
