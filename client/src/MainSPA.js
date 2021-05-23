import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  box-sizing: border-box;
  display: block;
`;
const Title = styled.div`
  min-height: 7vh;
`;

const HeroImage = styled.div`
  background-image: url("./coffeeBackgroundMain.jpg");
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;

const Flexbox = styled.div`
  color: black;
  text-align: center;
  line-height: 3vh;
`;

const Detail = styled.div`
  color: black;
  text-align: center;
  line-height: 3vh;
`;

export function MainSPA() {
  return (
    <Wrapper>
      <Title>Login</Title>
      <HeroImage>
        <Flexbox>twologins</Flexbox>
      </HeroImage>
      <Detail>asdf</Detail>
    </Wrapper>
  );
}

export default MainSPA;
