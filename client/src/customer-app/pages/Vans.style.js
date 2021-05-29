import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Container = styled.div`
  display: flex;
`;

export const CurrentLocationButton = styled.button`
  float: right;
`;

export const LeftDetail = styled.div`
  width: 25%;
  text-align: center;
  & > {
    margin-left: auto;
    margin-right: auto;
  }

  @media ${device.tablet} {
    width: %;
  }
`;

export const RightDetail = styled.div`
  width: 75%;
`;
export const Title = styled.h1`
  /* font-family: initial; */
`;

export const VansList = styled.div`
  width: 100%;
  height: 90px;

  &:active {
    background-color: #aad9cd;
  }

  &:hover {
    background-color: #aad9cd;
  }
`;

export const OrderButton = styled.button`
  position: fixed;
  bottom: 0;
  height: 12vh;
  width: 30%;
  border-radius: 5px;
  background-color: white;
  &:focus {
    color: white;
    background: black;
    cursor: pointer;
  }
`;

export const VanButton = styled.button`
  width: 100%;
  height: 15vh;
  border-radius: 5px;
  background-color: white;
  border-color: white;

  &:focus {
    color: black;
    background: #aad9cd;
    cursor: pointer;
  }

  &:hover {
    background-color: blue;
  }
`;

export const VanButtonTitle = styled.p`
  text-align: left;
`;

export const VanButtonDistance = styled.p`
  text-align: right;
`;
