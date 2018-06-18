import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import {
  deleteGalleryPicture,
  deletePictureFromCloud
} from "../../actions/profileActions";
// Styled Components
import styled from "styled-components";
import Button from "../common/Button";
import Link from "../common/Link";

const UserPicturesContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  h4 {
    text-align: center;
  }
  @media (max-width: 650px) {
    padding: 0 5%;
    margin-right: 0;
  }
`;
const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;
const ImageContainer = styled.div`
  padding: 2% 2%;
  position: relative;
  display: inline-block;
`;
const GalleryImg = styled.img`
  height: 100px;
  width: 80px;
  object-fit: cover;
  position: relative;
`;
const ButtonCross = styled.button`
  border: none;
  outline: none;
  right: 0;
  top: 0;
  position: absolute;
  cursor: pointer;
`;

class UserPictures extends Component {
  onDeleteClick(id, imageId) {
    this.props.deleteGalleryPicture(id, imageId);
    axios.post("/api/profile/profile-gallery/delete", { imageId });
  }
  render() {
    const gallery = this.props.gallery.map(image => (
      <ImageContainer key={image._id}>
        <GalleryImg src={image.image} />
        <ButtonCross
          onClick={this.onDeleteClick.bind(this, image._id, image.image_id)}
        >
          <i class="fas fa-minus-square" />
        </ButtonCross>
      </ImageContainer>
    ));
    return (
      <UserPicturesContainer>
        <h4>Gallery</h4>
        <GalleryContainer>{gallery}</GalleryContainer>
        <Link href="/profile-gallery">
          <Button style={{ fontSize: "0.6rem" }}>Add Image</Button>
        </Link>
      </UserPicturesContainer>
    );
  }
}

export default connect(
  null,
  { deleteGalleryPicture, deletePictureFromCloud }
)(UserPictures);
