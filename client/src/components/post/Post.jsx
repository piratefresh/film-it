import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
// Styled Components
import styled from "styled-components";
import Moment from "react-moment";

const PostContainer = styled.div`
  background: #fff;
  height: 100%;
  margin: 30px 0;
  display: grid;
  grid-template-areas:
    "content-header sidebar"
    "content-body sidebar";
  grid-template-columns: 1fr 250px;
  grid-template-rows: 80px 1fr;
  grid-gap: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
`;
const PostHeader = styled.div`
  grid-area: content-header;
  padding: 10px 20px;
  h2 {
    font-family: "Poppins", sans-serif;
  }
  h3 {
    font-size: 1.8rem;
  }
`;
const PostHeaderImg = styled.div`
  float: left;
  img {
    padding: 0 10px 0 0;
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
`;
const PostBody = styled.div`
  grid-area: content-body;
  padding: 0 20px;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-gap: 3%;
  margin: 4% 0;
  img {
    height: 200px;
    width: 100%;
    object-fit: cover;
  }
`;
const PostBodyProjectDesc = styled.div`
  border-bottom: 3px solid #fdca1e;
`;
const PostSideBar = styled.div`
  grid-area: sidebar;
  display: grid;
  grid-template-rows: repeat(3, minmax(150px, 200px));
  background: #e2eef0;
  padding: 0 5%;
  font-size: 0.9rem;
`;
const PostUser = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #7d48df;
  img {
    margin-top: 4%;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  p {
    margin: 5% 0;
  }
`;
const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #333;
`;
const PostTags = styled.div`
  li {
    list-style: none;
    margin: 10px 0;
    color: #f7f7f7;
    background: #7d48df;
    font-size: 1rem;
    text-align: center;
  }
`;

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let tags;
    if (post.tags) {
      tags = post.tags.map((tag, index) => <li key={index}>{tag}</li>);
    }
    let roles;
    if (post.seeking) {
      roles = post.seeking.map((role, index) => (
        <div key={role._id} className="role-description">
          <h4>{role.role}</h4>
          <p>{role.desc}</p>
        </div>
      ));
    }

    // Check for state is loaded
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <PostContainer>
          <PostHeader>
            <PostHeaderImg>
              <img src={post.avatar} alt="" srcset="" />
            </PostHeaderImg>
            <h2>{post.title}</h2>
            <p>
              {post.city}, {post.state}
            </p>
            <p>
              <Moment format="YYYY/MM/DD">{post.date}</Moment>
              <i class="far fa-clock" />
            </p>
          </PostHeader>
          <PostBody>
            <img src={post.image} alt="" srcset="" />
            <PostBodyProjectDesc>
              <h4>Project Description</h4>
              <p>{post.desc}</p>
            </PostBodyProjectDesc>
            {roles}
          </PostBody>
          <PostSideBar>
            <PostUser>
              <img src={post.avatar} alt="" srcset="" />
              <p>{post.name}</p>
            </PostUser>
            <PostDetails>
              <p>
                Duration:{" "}
                <strong>
                  <Moment format="YYYY/MM/DD">{post.start}</Moment> -{" "}
                  {isEmpty(post.end) ? (
                    ""
                  ) : (
                    <Moment format="YYYY/MM/DD">{post.end}</Moment>
                  )}
                </strong>
              </p>
              <p>
                Budget:{" "}
                <strong>{isEmpty(post.budget) ? null : post.budget}</strong>
              </p>
              <p>
                Location:{" "}
                <strong>
                  {post.city}, {post.state}
                </strong>
              </p>
            </PostDetails>
            <PostTags>
              <p>Tags:</p>
              {tags}
            </PostTags>
          </PostSideBar>
        </PostContainer>
      );
    }
    return <div>{postContent}</div>;
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
