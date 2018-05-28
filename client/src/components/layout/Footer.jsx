import React from "react";
import styled from "styled-components";
import FooterImg from "../common/camera-bg.png";

const FooterBar = styled.footer`
  background: rgb(46, 46, 46);
  color: #fff;
  padding: 15px 0;
`;
const FooterCamera = styled.div`
  display: flex;
  justify-content: flex-end;

  > img {
    height: 100%;
    width: 300px;
  }
`;
export default () => {
  return (
    <div>
      <FooterCamera>
        <img src={FooterImg} alt="Camera" srcset=" " />
      </FooterCamera>
      <FooterBar />
    </div>
  );
};
