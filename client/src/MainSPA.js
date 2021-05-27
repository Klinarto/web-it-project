import React from "react";
import styled from "styled-components";
import Link from "react-router-dom/Link";

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  min-height: 50vh;
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
  padding: 15px 25px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #04aa6d;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
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
        <Title>Vendor login</Title>
        <Link to={"/vendor/login"}>
          <MyButton>button</MyButton>
        </Link>
      </LeftContainer>
      <RightContainer>
        <Title>Customer login</Title>
        <Link to={"/customer/login"}>
          <MyButton>button</MyButton>
        </Link>
      </RightContainer>
    </Wrapper>
  );
}

export default MainSPA;
