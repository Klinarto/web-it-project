import React from "react";
import {
  Container,
  LeftWrapper,
  LeftImage,
  RightImage,
  Title,
  MyButton,
} from "./welcome.style";
import coffeeBackground from "../../coffeeBackground.png";
import cookieLogo from "../../cookieLogo.png";

export function Welcome() {
  return (
    <Container>
      <LeftWrapper>
        <LeftImage alt="cookie-logo" src={cookieLogo} />
        <Title>Snacks in a Van</Title>
        <MyButton>Find closest van</MyButton>
      </LeftWrapper>
      <RightImage alt="coffee-image" src={coffeeBackground} />
    </Container>
  );
}

export default Welcome;
