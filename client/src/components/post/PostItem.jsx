import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
// Styled Components
import styled from "styled-components";
import Link from "../common/Link";

const PostCard = styled.div`
  margin: 60px 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: auto 150px auto;
  grid-gap: 20px;
  background: #fff;
`;
const PostCardTitle = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-gap: 10px;
  padding: 10px;

  h3 {
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  img {
    float: left;
    width: 30px;
    height: 30px;
  }
  p {
    font-size: 0.7rem;
    margin: 0;
  }
`;
const PostCardTitleDate = styled.div`
  justify-self: end;
`;
const PostCardContent = styled.div`
  padding: 10px;
  font-weight: 200;
  font-family: "Open Sans", sans-serif;
  a {
    font-size: 0.8rem;
    font-weight: 100;
  }
`;
const PostCardFooter = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(2, minmax(50px, 1fr));
  grid-template-areas: "rating details tags";
  grid-gap: 25px;
  background: #7d48df;
  padding: 20px;
  color: #fff;

  li {
    padding: 0 5px;
    background: #fff;
    color: #7d48df;
    font-size: 0.7rem;
    text-align: center;
    border-radius: 5px;
  }
  p {
    font-size: 0.9rem;
  }
`;
const PostCardFooterDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

class PostItem extends Component {
  render() {
    const { post, auth } = this.props;
    return (
      <PostCard>
        <PostCardTitle>
          <img src={post.avatar} alt="user avatar" />
          <div>
            <h3>{post.title}</h3>
            <p>
              {post.city}, {post.state}
            </p>
          </div>
          <PostCardTitleDate>
            {" "}
            <p>
              <Moment format="YYYY/MM/DD">{post.date}</Moment>
              <i class="far fa-clock" />
            </p>
          </PostCardTitleDate>{" "}
        </PostCardTitle>
        <PostCardContent>{post.desc}</PostCardContent>
        <PostCardFooter />
      </PostCard>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostItem);
