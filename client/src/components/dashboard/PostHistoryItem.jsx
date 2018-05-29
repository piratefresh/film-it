import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../common/Button";
import Link from "../common/Link";
import { deletePost } from "../../actions/postActions";

const PostDetails = styled.div`
  ::after {
    content: "";
    display: block;
    border-bottom: 3px solid #7d48df;
    margin: 1% 0;
  }
  p {
    font-size: 0.8rem;
  }
`;

class PostHistoryItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  onEditClick(id) {
    this.props.editPost(id);
  }
  render() {
    const { post } = this.props;
    return (
      <PostDetails>
        <div className="post-title">
          <h4>{post.title}</h4>
          <div className="post-shorten">{post.desc.substr(0, 150)}</div>
        </div>{" "}
        <Button
          onClick={this.onDeleteClick.bind(this, post._id)}
          style={{ background: "#fd381e" }}
          type="button"
        >
          Delete
        </Button>
        <Link href={`/edit-post/${post._id}`}>
          <Button type="button">Edit</Button>
        </Link>
      </PostDetails>
    );
  }
}

PostHistoryItem.propTypes = {
  deletePost: PropTypes.func.isRequired
};

export default connect(null, { deletePost })(PostHistoryItem);
