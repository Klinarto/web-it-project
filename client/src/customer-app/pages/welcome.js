import React from "react";
import { Container, LeftWrapper, RightWrapper, LeftImage, RightImage, Title, MyButton } from "./welcome.style";
import coffeeBackground from "../../coffeeBackground.png";
import cookieLogo from "../../cookieLogo.png";
export function Welcome() {
  return (
    <Container>
      <LeftWrapper>

        <LeftImage alt="" src={cookieLogo} />
        <Title>Snacks in a Van</Title>
        <MyButton>Find cloest van</MyButton>

      </LeftWrapper>


      <RightWrapper>
        <RightImage alt="" src={coffeeBackground} />
      </RightWrapper>

    </Container>
  );
}

export default Welcome;
