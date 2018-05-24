import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Actions
import { deleteExperience } from "../../actions/profileActions";
// Styled Components
import styled from "styled-components";
import Button from "../common/Button";
//Style Dates
import Moment from "react-moment";

const UserExperience = styled.div`
  grid-area: exp;
  padding: 5% 0;
`;
const ExperienceDetails = styled.div``;
const ExperienceTitle = styled.div`
  font-size: 1.2rem;
`;
const ExperienceJobTitle = styled.div`
  color: #333;
`;
const ExperienceShorten = styled.div``;

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <ExperienceDetails key={exp._id}>
        <ExperienceTitle />
        <ExperienceJobTitle>
          <p>
            {exp.title} @
            {exp.company}
          </p>
        </ExperienceJobTitle>
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
          style={{ background: "#fd381e" }}
        >
          Delete
        </Button>
      </ExperienceDetails>
    ));
    return (
      <div>
        <h4>User Experience</h4>
        {experience}
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
