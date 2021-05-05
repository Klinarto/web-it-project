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
import { Link } from "react-router-dom";
export function Welcome() {
  return (
    <Container>
      <LeftWrapper>
        <LeftImage alt="cookie-logo" src={cookieLogo} />
        <Title>Snacks in a Van</Title>
        <Link to="/customer/vans">
          <MyButton>Find closest van</MyButton>
        </Link>
      </LeftWrapper>
      <RightImage alt="coffee-image" src={coffeeBackground} />
    </Container>
  );
}

export default Welcome;
