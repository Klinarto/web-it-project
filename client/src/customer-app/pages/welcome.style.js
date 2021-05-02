import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0;
  padding: 0;
`;

export const LeftWrapper = styled.div`
  min-width: 40%;
  margin-bottom: 4%;

  @media ${device.mobileM} {
    flex: 0 0 60%;
    max-width: 40%;
  }

  @media ${device.tablet} {
    flex: 0 0 40%;
    max-width: 40%;
  }
`;
export const LeftImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 24%;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const MyButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;

  background-color: black;
  color: white;
  padding: 7px 14px;
  transition: background 0.5s ease-in-out;
  width: 37%;
  border-radius: 5px;
  &:hover {
    color: black;
    background: #fff;
  }
`;

export const RightWrapper = styled.div`
  min-width: 60%;
  display: grid;
  height: 100%;
`;
export const RightImage = styled.img`
  position: absolute;
  right: 0;
  object-fit: cover;
  object-position: 15% 85%;
  max-width: 100%;
  height: 100%;

  @media ${device.mobileM} {
    flex: 0 0 40%;
    max-width: 40%;
  }

  @media ${device.tablet} {
    flex: 0 0 60%;
    max-width: 60%;
  }

  // margin: auto;
`;

export const HeaderWrapper = styled.h1`
  color: grey;
`;
