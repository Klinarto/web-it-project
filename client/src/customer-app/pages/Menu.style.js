import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Title = styled.h1`
  font-size: 32px;
`;

export const UL = styled.li`
  list-style-type: none;
`;

export const Image = styled.img`
  right: 0;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const ImageBig = styled.img`
  display: block;
  /* width: 300px; */
  height: 200px;
  width: 100%;
  max-height: 50%;
  object-fit: cover;
  align-self: center;
`;

export const Wrapper = styled.div`
  padding: 5%;
  padding-top: 3%;
  /* width: 80%; */
  align-self: center;
  align-items: center;
`;

export const DIV = styled.div`
  flex: 2;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
`;

export const LeftWrapper = styled.div`
  justify-content: center;
  min-width: 50%;
`;

export const RightWrapper = styled.div`
  justify-content: center;
  min-width: 10%;
`;

export const Buttons = styled.div`
  justify-content: center;
  padding-left: 33%;
  padding-right: auto;
`;

export const Table = styled.table`
  align-self: center;
  margin-left: auto;
  margin-right: auto;
`;

export const DIV2 = styled.div`
  padding: 5px;
  /* width: 25vw; */
  overflow: hidden;
`;

export const ROW = styled.div`
  display: grid;
  clear: both;
  align-self: center;

  @media ${device.mobileL} {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
`;

export const InTR = styled.tr`
  padding: 5px;
  height: 20%;
  width: 100%;
`;

export const Price = styled.span`
  color: grey;
`;

export const MyButton = styled.button`
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25%;

  background-color: #aad9cd;
  color: white;
  padding: 7px 14px;
  transition: background 0.5s ease-in-out;
  width: 100%;
  border-radius: 10px;
  border: none;
  &:hover {
    color: black;
    background: #fff;
    cursor: pointer;
  }
`;

export const AddItem = styled.button`
  border-radius: 100%;
  width: 25px;
  height: 25px;

  background-color: #aad9cd;
  font-size: 20px;
  color: white;
  padding: 0;
  transition: background 0.5s ease-in-out;
  width: 100%;
  border-radius: 10px;
  border: none;
  &:hover {
    color: black;
    background: #fff;
  }
`;
