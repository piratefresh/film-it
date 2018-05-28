import React, { Component } from "react";
import styled from "styled-components";
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2%;
  border-radius: 10px;
  img {
    height: 200px;
    width: 100%;
    object-fit: cover;
  }
`;

class ProfileGallery extends Component {
  render() {
    const { gallery } = this.props;
    let galleryContent = gallery.map((img, index) => (
      <img key={img._id} src={img.image} alt="" srcset="" />
    ));
    return (
      <div>
        <Gallery>{galleryContent}</Gallery>
      </div>
    );
  }
}

export default ProfileGallery;
