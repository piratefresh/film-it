import React, { Component } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import illustrationHeader from "../../img/1x/HeaderIllustration.png";
import websitePreview2 from "../../img/Screenshot-2018-6-26 React App.png";
import produceImg from "../../img/1x/Produce.png";
import recruitImg from "../../img/1x/Recruit.png";

const Center = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  margin-left: 5%;
`;
const LandingWrapper = styled.div``;
const Section1 = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) 1fr;
  grid-template-areas: "text img";
  position: relative;
  height: 100%;
  width: 100%;
  color: #7d48df;
  background: #fff;
  padding-top: 5%;
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "text"
      "img";
    grid-gap: 5%;
  }
`;
const Section1Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const Section1Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-area: text;
  h4 {
    font-size: 6rem;
  }
  h5 {
    font-size: 3em;
  }
  p {
  }
  @media (max-width: 940px) {
    h4 {
      font-size: 4rem;
    }
    h5 {
      font-size: 2em;
    }
  }
  @media (max-width: 650px) {
    h4 {
      font-size: 2rem;
    }
    h5 {
      font-size: 1em;
    }
  }
`;
const Section2Header = styled.div`
  position: absolute;
  width: 100%;
  top: -2px;
`;
const Section2 = styled.div`
  position: relative;
  max-height: 100%;
  width: 100%;
  background: #7d48df;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "img text";
  img {
    width: 100%;
    height: 100%;
  }
`;
const Sec2Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  padding: 0 10%;
  h2 {
    font-size: 3rem;
  }
`;
const BrowserWrapper = styled.div`
  padding: 5% 5%;
  width: 100%;
  height: 100%;
`;
const Section3 = styled.div`
  background: #fff;
  height: 100%;
`;
const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    "img1 text1"
    "text2 img2";
  padding: 5%;
`;
const InfoImg = styled.div`
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #7d48df;
  h2 {
    font-size: 3rem;
  }
`;

class Landing extends Component {
  render() {
    return (
      <div>
        <LandingWrapper>
          <Section1>
            <Section1Text>
              <h4 className="centerObj">Film-IT</h4>
              <h5 className="centerObj">Recruit and Produce</h5>
              <p className="centerObj">
                Realize your ideas with the help of others
              </p>
              <div className="centerObj">
                <Button style={{ background: "red", marginRight: "5%" }}>
                  Take A Tour
                </Button>{" "}
                <Button style={{ background: "red" }}>Join Now</Button>
              </div>
            </Section1Text>
            <Section1Img src={illustrationHeader} alt="Recruit and Produce" />
          </Section1>
          <Section2>
            {/*             <Section2Header>
              <svg viewBox="0 0 1200 53" style={{ height: "auto" }}>
                <path
                  fill="#fff"
                  d="M1196.008 53H1200V0H0v44.816-8.184C159.341 14.63 311.343 2.484 456.007.196 600.122-2.084 846.789 15.518 1196.008 53z"
                />
              </svg>
            </Section2Header> */}
            <BrowserWrapper>
              <div className="browser-mockup">
                <img
                  src={websitePreview2}
                  alt=""
                  srcset=""
                  className="centerObj"
                />
              </div>
            </BrowserWrapper>
            <Sec2Text>
              <h2>Simple job finder</h2>
              <p>Find all kinds of jobs within media production.</p>
            </Sec2Text>
          </Section2>
          <Section3>
            <InfoWrapper>
              <InfoImg style={{ gridArea: "img1" }}>
                <img src={recruitImg} alt="" srcset="" />
              </InfoImg>
              <InfoText style={{ gridArea: "text1" }}>
                <h2>Recruit</h2>
                <p>
                  Find people to produce your ideas, setup a job post free with
                  us.
                </p>
              </InfoText>
              <InfoText style={{ gridArea: "text2" }}>
                <h2>Produce</h2>
                <p>
                  Don't let your ideas just be ideas, with the help of our
                  members get the help needed to produce.
                </p>
              </InfoText>
              <InfoImg style={{ gridArea: "img2" }}>
                <img src={produceImg} alt="" srcset="" />
              </InfoImg>
            </InfoWrapper>
          </Section3>
        </LandingWrapper>
      </div>
    );
  }
}

export default Landing;
