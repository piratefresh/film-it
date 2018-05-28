import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { fetchUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";
import styled from "styled-components";
import ProfileActions from "./ProfileActions";
// Styled Components
import Button from "../common/Button";
import Link from "../common/Link";
import Experience from "./Experience";
import UserDetails from "./UserDetails";
import UserContact from "./UserContact";
import UserPictures from "./UserPictures";

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
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
`;
const DashboardTitle = styled.div`
  grid-area: header;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
`;
const ProfileButtons = styled.div``;
const DashboardDetails = styled.div`
  grid-area: details;
  grid-template-rows: repeat(auto-fit, 1fr);
  height: 100%;
  margin-right: 10%;
`;
const PostHistory = styled.div`
  grid-area: posts;
`;
const DashboardExp = styled.div`
  grid-area: exp;
`;
const DashboardReel = styled.div`
  grid-area: reel;
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
          <ContainerDashboard>
            <DashboardTitle>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
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
            <PostHistory>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              repellat voluptate saepe, quisquam quae voluptates enim eveniet
              totam laudantium, quibusdam tempora ipsa eos repudiandae
              distinctio? Officiis perferendis sequi debitis ducimus
              consequuntur quam deleniti ipsa excepturi iusto laudantium. Quo
              officiis tenetur nobis culpa expedita provident ipsam non vero
              nisi eaque eos necessitatibus, numquam doloribus magni iure
              ducimus esse harum, omnis quos maxime placeat quas! Assumenda
              ducimus distinctio maxime amet possimus quibusdam autem animi
              dolorum voluptas deleniti, repellendus qui earum culpa, ut,
              reiciendis hic nihil! Praesentium animi repellat officia in
              dolorem quos? Est cupiditate explicabo consequuntur quibusdam
              aliquid voluptates facilis nihil nam aliquam, dolore porro at
              velit vel ex vitae sint id, perferendis molestiae placeat
              voluptatem officia quod consequatur officiis. Expedita ducimus vel
              delectus odio sequi eaque consequatur praesentium, sit
              necessitatibus nobis ipsam maiores velit, repellendus, magni
              repellat voluptatum quis facere alias minima reiciendis error
              harum nulla ipsum. Earum veritatis eum quos quia unde velit
              inventore suscipit iusto id odio aliquam amet consequatur sapiente
              quam fugit cupiditate, incidunt culpa fugiat rerum pariatur
              consectetur veniam, molestiae tempore? Alias, tempora nam
              aspernatur aut ex officia laborum enim tenetur dolorum accusantium
              quidem a harum hic molestiae cum? Labore numquam aliquid suscipit
              hic? Alias fugiat perspiciatis voluptate vel explicabo vero
              aperiam et saepe aspernatur, omnis illo expedita suscipit modi
              quasi sapiente tempore tempora consequatur laudantium dolores
              exercitationem ea iure facere esse. Et natus deserunt aspernatur
              deleniti dolore, laudantium officiis nesciunt recusandae labore
              unde nihil iste quasi ipsam. Fuga, dolorum. Repudiandae quibusdam
              veritatis cupiditate ullam itaque, eos architecto beatae a
              possimus in molestiae cum sapiente consequatur, dolorum,
              voluptatum vero? Quasi eligendi doloremque nihil illo harum,
              officia dignissimos vitae quae aliquid, optio vero ad pariatur
              ipsum esse officiis? Dolore cupiditate mollitia culpa voluptatem.
              Cum esse vero dolorem totam distinctio impedit quam ab tempora
              illo! Fugit tempora iste, qui placeat ullam vel porro illum ab. Et
              maxime quasi voluptate ipsa facilis itaque eos aut molestiae
              consequuntur, explicabo sint, laboriosam atque iusto quae odit
              animi pariatur quaerat deleniti non, doloremque distinctio
              excepturi.{" "}
            </PostHistory>

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
                <Button onClick={this.onDeleteClick.bind(this)}>
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
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  fetchUser
})(Dashboard);
