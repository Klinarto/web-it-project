import React from "react";
import {
  Container,
  TopWrapper,
  TopImage,
  BottomImage,
  Title,
  Star
} from "./Rate.style";
import coffeeBackgroundHalf from "../../coffeeBackgroundHalf.png";
import coffeeCup from "../../coffeeCup.png";

export function Rate() {
  return (
    <Container>
      <TopWrapper>
        <TopImage alt="coffeeCup-image" src={coffeeCup} />
        <Title>Rate your experience</Title>
        <Star>★★★★☆</Star> {/* js later so the user can rate*/}
      </TopWrapper>

      <BottomImage alt="coffee-image" src={coffeeBackgroundHalf} />

    </Container>);
}

export default Rate;
