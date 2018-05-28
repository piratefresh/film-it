import React, { Component } from "react";
import Moment from "react-moment";
import styled from "styled-components";

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

class ProfileCreds extends Component {
  render() {
    const { experience } = this.props;
    let expItems = "";
    if (experience && experience.length > 0) {
      expItems = experience.map(exp => (
        <ExperienceDetails key={exp._id}>
          <ExperienceTitle>
            <p>
              {exp.title} at {exp.company}
            </p>
          </ExperienceTitle>
          <ExperienceJobTitle>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
            <p>
              Location: {exp.city === null ? "" : exp.city + " , " + exp.state}
            </p>
          </ExperienceJobTitle>
          <ExperienceShorten>
            <p>{exp.description}</p>
          </ExperienceShorten>
        </ExperienceDetails>
      ));
    }

    return <div>{expItems}</div>;
  }
}

export default ProfileCreds;
