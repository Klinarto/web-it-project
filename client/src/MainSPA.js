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
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;

const Flexbox = styled.div`
  background-color: #4b4b4b;
  color: white;
  text-align: center;
  line-height: 3vh;
`;

const Detail = styled.div`
  background-color: #4b4b4b;
  color: white;
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
