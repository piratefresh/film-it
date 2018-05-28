import React, { Component } from "react";
import styled from "styled-components";

import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import JobList from "./JobList";

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
      <div>
        <Title>Postings</Title>
        <TopBar />
        <SearchBar />
        <JobList />
      </div>
    );
  }
}

export default Landing;
