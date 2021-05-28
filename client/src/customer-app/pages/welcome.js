import React, { useContext, useEffect } from "react";
import {
  Container,
  LeftWrapper,
  LeftImage,
  RightImage,
  Title,
  MyButton,
} from "./welcome.style";
import coffeeBackground from "../../images/coffeeBackground.png";
import cookieLogo from "../../images/cookieLogo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/auth-context";
export function Welcome() {
  const auth = useContext(AuthContext);
  useEffect(() => {
    auth.logout();
  }, []);

  return (
    <Container>
      {/* Left container made to 40% of the screen*/}
      <LeftWrapper>
        <LeftImage alt="cookie-logo" src={cookieLogo} />
        <Title>Snacks in a Van</Title>
        <Link to="/customer/menu">
          <MyButton>Open menu</MyButton>
        </Link>
      </LeftWrapper>
      {/* Right container made to 60% of the screen*/}

      <RightImage alt="coffee-image" src={coffeeBackground} />
    </Container>
  );
}

export default Welcome;
