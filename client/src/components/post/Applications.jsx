import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../common/Button";
import Link from "../common/Link";
import Spinner from "../common/Spinner";

const ApplyContainer = styled.div`
  height: 100%;
  position: relative;
  h4 {
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 1.3rem;
    padding: 5% 0;
  }
`;
const ProfileCard = styled.div`
  display: inline-block;
  position: relative;
  margin: 15% 0;
  margin-left: 10%;
  width: 280px;
  height: 310px;
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

class Applications extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    console.log(post);
    let applyContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      applyContent = <Spinner />;
    } else {
      applyContent = post.applications.map(application => (
        <ProfileCard key={application._id}>
          <CardHeader>
            <img src={application.avatar} alt="" srcset="" />
          </CardHeader>
          <CardContent>
            <Link href={`/profile/${application.handle}`}>
              <h4 style={{ margin: "2% 0" }}>{application.user.name}</h4>
            </Link>
            <p>
              <strong>Email:</strong> {application.email}
            </p>
            <p>
              <strong>Sales Pitch: </strong>
              {application.coverletter}
            </p>
            <Link href={`/profile/${application.handle}`}>
              <Button>View Profile</Button>
            </Link>
          </CardContent>
        </ProfileCard>
      ));
    }

    return (
      <ApplyContainer>
        <h4>Applications for {post.title}</h4>
        {applyContent}
      </ApplyContainer>
    );
  }
}

Applications.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Applications);
