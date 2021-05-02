import React from "react";
import {
  Container,
  LeftWrapper,
  RightImage,
  LeftImage,
  Title,
} from "./welcome.style";
import coffeeBackground from "../../coffeeBackground.png";
import SignIn from "../components/Login";
import cookieLogo from "../../cookieLogo.png";

export function Login() {
  return (
    <Container>
      <LeftWrapper>
        <LeftImage alt="cookie-logo" src={cookieLogo} />
        <Title>Snacks in a Van</Title>
        <SignIn />
      </LeftWrapper>
      <RightImage alt="coffee-image" src={coffeeBackground} />
    </Container>
  );
}

export default Login;
