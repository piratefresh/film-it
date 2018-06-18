import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";
import ShortenString from "../common/ShortenString";
// Styled Components
import styled from "styled-components";
import Link from "../common/Link";
import Button from "../common/Button";
// Modal
import Modal from "../common/Modal";

const PostCard = styled.div`
  margin: 60px 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: minmax(30px, 75px) 150px auto;
  grid-gap: 20px;
  background: #fff;
  font-size: 0.8rem;
  @media (max-width: 800px) {
   width: 100%;
  }}
  @media (max-width: 600px) {
    height: 100%;
   width: 100%;
   margin: 10% 0;
  }}
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
  padding: 1%;
  font-weight: 200;
  font-family: "Open Sans", sans-serif;
  a {
    font-size: 0.8rem;
    font-weight: 100;
  }
  @media (max-width: 800px) {
   width: 100%;
  }}
  @media (max-width: 600px) {
   width: 100%;
   p{
     padding: 0 5%;
   }
  }}
`;
const PostCardFooter = styled.div`
  display: grid;
  grid-template-columns: minmax(50px, 250px) minmax(50px, 100px) minmax(
      350px,
      1fr
    );
  grid-gap: 25px;
  background: #7d48df;
  padding: 20px;
  color: #fff;
  align-items: baseline;

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

    @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }}
  @media (max-width: 600px) {
    margin-top: 5%;
  }
`;
const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
  }
`;
const StyledTags = styled.div`
margin: 0 2%;
      @media (max-width: 800px) {
        margin: 2% 0;
  }}
`;

class PostItem extends Component {
  state = {
    isOpen: false
  };
  tagButton = React.createRef();

  toggleModal = e => {
    e.preventDefault(e);
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { post, profile, auth } = this.props;
    const tags = post.tags.map((tag, index) => (
      <StyledTags>
        <Button
          key={index}
          style={{ background: "#fdca1e", margin: "0 2%", cursor: "auto" }}
          innerRef={this.tagButton}
        >
          <p>{tag}</p>
        </Button>
      </StyledTags>
    ));
    return (
      <PostCard>
        <PostCardTitle>
          <Link href={`/profile/${post.handle}`}>
            <img src={post.avatar} alt="user avatar" />
          </Link>
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
            <Button
              onClick={this.toggleModal}
              styled={{ background: "#fdca1e" }}
            >
              Apply Now
            </Button>
            <Modal
              show={this.state.isOpen}
              onClose={this.toggleModal}
              profile={profile}
              auth={auth}
            >
              Here's some content for the modal
            </Modal>
          </PostCardTitleDate>{" "}
        </PostCardTitle>
        <PostCardContent>
          {/* trunc = ShortenString */}
          <p>{post.desc.trunc(350)}</p>
          <Link href={`/post/${post._id}`}>
            <Button style={{ margin: "0 5%" }}>Read More</Button>
          </Link>
        </PostCardContent>
        <PostCardFooter>
          <div className="duration">
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
          </div>
          <div className="details">
            <p>
              Budget: <strong>{isEmpty(post.budget) ? "" : post.budget}</strong>
            </p>
          </div>
          <TagsWrapper>{tags}</TagsWrapper>
        </PostCardFooter>
      </PostCard>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(PostItem);
