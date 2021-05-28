import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  Container,
  LeftWrapper,
  RightImage,
  LeftImage,
  Title,
} from "./Welcome.style";
import coffeeBackground from "../../images/coffeeBackground.png";
import SignIn from "../components/Login";
import cookieLogo from "../../images/cookieLogo.png";

// Login page, left has the component of login page, which is being imported from the components folder,
// Right side is a image in a flex-box to have 4:6 ratio
export function Login() {
  const history = useHistory();
  const goBack = () => {
    history.push("/vendor/login");
  };

  return (
    <Container>
      <LeftWrapper>
        <h1>Customer Login</h1>
        <h4>Are you a Vendor?</h4>
        <Button type="button" onClick={goBack}>
          Go to Vendor Login
        </Button>
        <br />
        <LeftImage alt="cookie-logo" src={cookieLogo} />
        <Title>Snacks in a Van</Title>
        <SignIn />
      </LeftWrapper>
      <RightImage alt="coffee-image" src={coffeeBackground} />
    </Container>
  );
}

export default Login;
