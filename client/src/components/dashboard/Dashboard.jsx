import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { getPostsById } from "../../actions/postActions";
import { fetchUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";
import styled from "styled-components";
import PostHistoryItem from "./PostHistoryItem";
// Styled Components
import Button from "../common/Button";
import Link from "../common/Link";
import Experience from "./Experience";
import UserDetails from "./UserDetails";
import UserContact from "./UserContact";
import UserPictures from "./UserPictures";
// Socket.io
import { socket } from "../../store";

const ContainerDashboard = styled.div`
  height: 100%;
  padding: 5% 5%;
  background: #fff;
  margin-top: 5%;
  display: grid;
  grid-template-areas:
    "header header header"
    "details posts posts"
    "exp exp exp"
    "reel reel reel";
  grid-gap: 5%;
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  p {
    font-size: 0.8rem;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  @media (max-width: 1000px) {
    grid-template-columns: minmax(250px, 1fr);
    margin: 5% auto;
    padding: 0;
    grid-gap: 0;
  }
  @media (max-width: 650px) {
    grid-template-areas:
      "header"
      "details"
      "posts"
      "exp"
      "reel";
    width: 100%;
  }
`;
const DashboardTitle = styled.div`
  grid-area: header;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  h4 {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  @media (max-width: 650px) {
    padding: 5% 5%;
    h4 {
      display: block;
    }
  }
`;
const ProfileButtons = styled.div``;
const DashboardDetails = styled.div`
  grid-area: details;
  grid-template-rows: repeat(auto-fit, 1fr);
  height: 100%;
  margin-right: 10%;
  width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  @media (max-width: 650px) {
    width: 100%;
  }
`;
const PostHistory = styled.div`
  grid-area: posts;
  margin: 5% 0;
`;
const DashboardExp = styled.div`
  grid-area: exp;
  margin: 5% 0;
`;
const DashboardReel = styled.div`
  grid-area: reel;
  margin: 5% 0;
`;

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getPostsById(this.props.auth.user.id);
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { posts } = this.props.post;

    // Post Map
    const postContent = posts.map(post => (
      <div>
        <PostHistoryItem key={post._id} post={post} user={user} />
      </div>
    ));
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <ContainerDashboard>
            <DashboardTitle>
              <h4 style={{}}>
                Welcome{" "}
                <Link
                  href={`/profile/${profile.handle}`}
                  style={{ padding: "0 0.5%" }}
                >
                  {" "}
                  {user.name}{" "}
                </Link>{" "}
                to your Dashboard
              </h4>
              <ProfileButtons>
                <Link href="/edit-profile">
                  <Button>Edit Profile</Button>
                </Link>
              </ProfileButtons>
            </DashboardTitle>
            <DashboardDetails>
              <UserDetails profile={profile} user={user} />
              <UserContact profile={profile} user={user} />
              <UserPictures
                gallery={profile.gallery}
                experience={profile.experience}
              />
            </DashboardDetails>
            <PostHistory>{postContent}</PostHistory>

            <DashboardExp>
              <Experience experience={profile.experience} />
            </DashboardExp>
            <DashboardReel>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                User Reel
              </h4>
            </DashboardReel>
            <ProfileButtons>
              <Link>
                <Button
                  style={{ fontSize: "0.6rem" }}
                  onClick={this.onDeleteClick.bind(this)}
                >
                  Delete My Account
                </Button>
              </Link>
            </ProfileButtons>
          </ContainerDashboard>
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

    return <div>{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPostsById: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    deleteAccount,
    getPostsById,
    fetchUser
  }
)(Dashboard);
