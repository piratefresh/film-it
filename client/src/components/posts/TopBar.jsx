import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { getPostsBySearch } from "../../actions/postActions";
// Styled Components
import styled from "styled-components";

const JobBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 2%;
  li {
    padding: 10px;
    list-style: none;
    background: #fff;
    cursor: pointer;
  }
  a {
    text-transform: uppercase;
    text-decoration: none;
  }
`;
const ActiveTab = styled.div`
  border-bottom: 5px solid #fdca1e;
`;

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };

    this.toggleClass = this.toggleClass.bind(this);
  }

  toggleClass(e, index, job) {
    e.preventDefault();

    this.setState({ active: index, query: job });
    this.props.getPostsBySearch(job);
  }

  onChange() {}

  render() {
    const arrJobs = [
      "Acting",
      "Producer",
      "Camera",
      "Light",
      "Sound",
      "VFX/Stunt"
    ];
    const buttonsArr = arrJobs.map((job, index) => {
      return (
        <li>
          <a
            key={index}
            id="query"
            name="query"
            value={this.state.query}
            onClick={e => this.toggleClass(e, index, job)}
          >
            {this.state.active === index ? <ActiveTab>{job}</ActiveTab> : job}
          </a>
        </li>
      );
    });
    return <JobBar>{buttonsArr}</JobBar>;
  }
}

export default connect(
  null,
  { getPostsBySearch }
)(TopBar);
