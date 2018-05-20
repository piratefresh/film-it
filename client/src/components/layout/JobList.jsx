import React, { Component } from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const Card = styled.div`
  margin: 60px 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: auto 150px auto;
  grid-gap: 20px;
  background: #fff;
`;
const CardTitle = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-gap: 10px;
  padding: 10px;
`;

const CardTitleImgWrapper = styled.div`
  float: left;
`;
const CardTitleImg = styled.img`
  width: 30px;
  height: 30px;
`;
const CardTitleTextHeader = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  justify-self: start;
`;

class JobList extends Component {
  render() {
    return (
      <Card>
        <CardTitle>
          <CardTitleImgWrapper>
            <CardTitleImg src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/cat-icon.png" />
          </CardTitleImgWrapper>
          <CardTitleTextHeader>Producer for Comedy Short</CardTitleTextHeader>
        </CardTitle>
      </Card>
    );
  }
}

JobList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(JobList);
