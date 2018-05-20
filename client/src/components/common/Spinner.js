import React from "react";
import spinner from "./spinner.gif";
import styled from "styled-components";

const Spin = styled.img`
  width: 200px;
  margin: auto;
  display: block;
`;

export default () => {
  return (
    <div>
      <Spin src={spinner} alt="loading dashboard..." />
    </div>
  );
};
