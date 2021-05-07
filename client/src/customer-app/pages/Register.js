import React from "react";
import {
  Container,
  LeftWrapper,
  RightImage,
  LeftImage,
  Title,
} from "./welcome.style";
import coffeeBackground from "../../coffeeBackground.png";
import CreateAccount from "../components/Register";
import cookieLogo from "../../cookieLogo.png";

// Register page, left has the component of register page, which is being imported,
// Right side is a image in a flex-box to have 4:6 ratio
export function Register() {
  return (
    <Container>
      <LeftWrapper>
        <LeftImage alt="cookie-logo" src={cookieLogo} />
        <Title>Snacks in a Van</Title>
        <CreateAccount />
      </LeftWrapper>
      <RightImage alt="coffee-image" src={coffeeBackground} />
    </Container>
  );
}

export default Register;
