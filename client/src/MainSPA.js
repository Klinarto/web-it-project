

import React from "react";
import styled from "styled-components";
import Link from "react-router-dom/Link";

const Wrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 700px;
  overflow: hidden;
  display: flex;

`;

const Title = styled.h1`
  min-height: 7vh;
`;

const LeftContainer = styled.div`
  width: 50%;
  padding: 30px 50px;

`;
const RightContainer = styled.div`
  width: 50%;
  padding: 30px 50px;

`;
const MyButton = styled.button`

`;

// const HeroImage = styled.div`
//   background-image: url("./coffeeBackgroundMain.jpg");
//   width: 100%;
//   height: 100%;
//   display: inline-block;
//   vertical-align: middle;
//   line-height: normal;
// `;

// const Flexbox = styled.div`
//   color: black;
//   text-align: center;
//   line-height: 3vh;
// `;

// const Detail = styled.div`
//   color: black;
//   text-align: center;
//   line-height: 3vh;
// `;

export function MainSPA() {
  return (
    <Wrapper>
      <LeftContainer>
        <Title>
          Vendor login
        </Title>
        <Link to={"/vendor/login"}>
          <MyButton>
            button
          </MyButton>
        </Link>
      </LeftContainer>
      <RightContainer>
        <Title>
          Customer login
        </Title>
        <Link to={"/customer/login"}>
          <MyButton>
            button
        </MyButton>
        </Link>

      </RightContainer>
    </Wrapper>
  );
}

export default MainSPA;
