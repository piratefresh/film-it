import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Button from "../common/Button";
import styled from "styled-components";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return <div>{postContent}</div>;
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
