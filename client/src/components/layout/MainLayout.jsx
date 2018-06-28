import React from "react";

import Navbar from "./Nav/Navbar";
import Footer from "./Footer";
//Styled Components
import styled from "styled-components";

const Container = styled.div`
  margin: 5% auto;
  width: 1000px;
  height: 100%;
  @media (max-width: 1000px) {
    width: 90%;
    margin: 0 auto;
  }
  @media (max-width: 600px) {
  }
`;

const MainLayout = props => (
  <div>
    <Container>{props.children}</Container>
    <Footer>
      <p>Film-It &copy; {new Date().getFullYear()}</p>
    </Footer>
  </div>
);

export default MainLayout;
