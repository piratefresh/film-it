import React, { Component } from "react";
import styled from "styled-components";

const JobBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 2%;
`;
const JobBarItem = styled.li`
  padding: 10px;
  list-style: none;
  background: #fff;
  cursor: pointer;
`;
const JobBarItemLink = styled.a`
  text-transform: uppercase;
  text-decoration: none;
`;

class TopBar extends Component {
  /*   constructor(props) {
    super(props);
    this.state = {
      isActiveOn: true
    };
    // Binding this
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {} */
  render() {
    return (
      <JobBar>
        <JobBarItem>
          <JobBarItemLink href="">Acting</JobBarItemLink>
        </JobBarItem>
        <JobBarItem>
          <JobBarItemLink href="">Acting</JobBarItemLink>
        </JobBarItem>
        <JobBarItem>
          <JobBarItemLink href="">Acting</JobBarItemLink>
        </JobBarItem>
        <JobBarItem>
          <JobBarItemLink href="">Acting</JobBarItemLink>
        </JobBarItem>
        <JobBarItem>
          <JobBarItemLink href="">Acting</JobBarItemLink>
        </JobBarItem>
      </JobBar>
    );
  }
}

export default TopBar;
