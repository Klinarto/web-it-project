import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  Container,
  LeftWrapper,
  RightImage,
  LeftImage,
  Title,
} from "./welcome.style";
import coffeeBackground from "../../images/coffeeBackground.png";
import CreateAccount from "../components/Register";
import cookieLogo from "../../images/cookieLogo.png";

// Register page, left has the component of register page, which is being imported,
// Right side is a image in a flex-box to have 4:6 ratio
export function Register() {
  const history = useHistory();
  const goBack = () => {
    history.push("/customer/menu");
  };

  return (
    <Container>
      <LeftWrapper>
        <Button type="button" onClick={goBack}>
          Go back to menu page
        </Button>
        <LeftImage alt="cookie-logo" src={cookieLogo} />
        <Title>Snacks in a Van</Title>
        <CreateAccount />
      </LeftWrapper>
      <RightImage alt="coffee-image" src={coffeeBackground} />
    </Container>
  );
}

export default Register;
