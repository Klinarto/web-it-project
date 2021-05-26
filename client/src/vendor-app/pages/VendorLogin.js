
import React from "react";
import {
  Container,
  LeftWrapper,
  RightImage,
  LeftImage,
  Title,
} from "./VendorWelcome.style";
import coffeeBackground from "../../images/coffeeBackground.png";
import SignIn from "../components/Login";
import cookieLogo from "../../images/cookieLogo.png";

// Login page, left has the component of login page, which is being imported from the components folder,
// Right side is a image in a flex-box to have 4:6 ratio
export function VendorLogin() {
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

export default VendorLogin;