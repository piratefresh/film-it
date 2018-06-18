import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Actions
import { deleteExperience } from "../../actions/profileActions";
// Styled Components
import styled from "styled-components";
import Button from "../common/Button";
import Link from "../common/Link";
//Style Dates
import Moment from "react-moment";

const UserExperienceContainer = styled.div`
  margin: 3% 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
`;
const ExperienceDetails = styled.div`
  background: #e2eef0;
  padding: 2% 2%;
  margin: 3% 0;
`;
const ExperienceTitle = styled.div`
  font-size: 1.3rem;
`;
const ExperienceJobTitle = styled.div`
  color: #333;
  font-size: 0.6rem;
`;
const ExperienceShorten = styled.div`
  font-size: 0.8rem;
  padding: 2% 0;
`;

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <ExperienceDetails key={exp._id}>
        <ExperienceTitle>
          {" "}
          <p>
            {exp.title} @
            {exp.company}
          </p>
        </ExperienceTitle>
        <ExperienceJobTitle>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </ExperienceJobTitle>
        <ExperienceShorten>
          <p>{exp.description}</p>
        </ExperienceShorten>
        <Button
          onClick={this.onDeleteClick.bind(this, exp._id)}
          style={{ background: "#fd381e", fontSize: "0.6rem" }}
        >
          Delete
        </Button>
      </ExperienceDetails>
    ));
    return (
      <UserExperienceContainer>
        <h4
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          User Experience
        </h4>
        {experience}
        <Link href="add-experience">
          <Button style={{ fontSize: "0.6rem" }}>Add Experience</Button>
        </Link>
      </UserExperienceContainer>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
