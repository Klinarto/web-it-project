import { urlencoded } from "express";
import React from "react";
import { Container, LeftWrapper, RightWrapper } from "./welcome.style";

var imageSrc = url("clientpubliclogo512.png");

export function Welcome() {
  return (
    <Container>
      <LeftWrapper>asdfasdf</LeftWrapper>
      <RightWrapper>
        <img src={imageSrc} />
      </RightWrapper>
    </Container>
  );
}

export default Welcome;
