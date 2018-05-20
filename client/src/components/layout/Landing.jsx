import React, { Component } from "react";
import styled from "styled-components";

import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import JobList from "./JobList";

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const Title = styled.h3`
  margin: 5% 0;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 2rem;
  color: #7d48df;
  letter-spacing: 0.1rem;
`;

class Landing extends Component {
  render() {
    return (
      <Container>
        <Title>Postings</Title>
        <TopBar />
        <SearchBar />
        <JobList />
      </Container>
    );
  }
}

export default Landing;
