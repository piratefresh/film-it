import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteGalleryPicture } from "../../actions/profileActions";
// Styled Components
import styled from "styled-components";
import Button from "../common/Button";
import Link from "../common/Link";

const UserPicturesContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  margin-right: 10%;

  &:after {
    content: "";
    display: block;
    margin: 3% 0;
    border-bottom: 3px solid #7d48df;
  }
`;
const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const ImageContainer = styled.div`
  padding: 2% 2%;
`;
const GalleryImg = styled.img`
  height: 100px;
  width: 80px;
  object-fit: cover;
  position: relative;
`;

class UserPictures extends Component {
  onDeleteClick(id, cloudinary_id) {
    this.props.deleteGalleryPicture(id, cloudinary_id);
  }
  render() {
    const gallery = this.props.gallery.map(image => (
      <ImageContainer key={image._id}>
        <div>
          <GalleryImg src={image.image} style={{ gridArea: "img" }} />
        </div>
        <div>
          {console.log(image.image_id)}
          <Button
            onClick={this.onDeleteClick.bind(this, image._id, image.image_id)}
            style={{
              background: "#fd381e",
              width: "70px",
              gridArea: "btn",
              position: "relative"
            }}
          >
            Delete
          </Button>
        </div>
      </ImageContainer>
    ));
    return (
      <UserPicturesContainer>
        <h4>Gallery</h4>
        <GalleryContainer>{gallery}</GalleryContainer>
        <Link href="/profile-gallery">
          <Button>Add Image</Button>
        </Link>
      </UserPicturesContainer>
    );
  }
}

export default connect(null, { deleteGalleryPicture })(UserPictures);
