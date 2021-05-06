import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Container = styled.div`

`;

export const TopWrapper = styled.div`

    margin-left: 38%;
    margin-top: 5%;
    @media ${device.tablet} {
    flex: 0 0 60%;
    max-width: 60%;
  }

  @media ${device.laptop} {
    flex: 0 0 40%;
    max-width: 40%;
  }



`;
export const TopImage = styled.img`
    width: 100px;
    height: auto;
    padding-left: 103px;

    
`;


export const Title = styled.h1`

`;



export const Button = styled.button`
    margin-top: 10px;
    margin-left: 102px;


    display: block;
  

  background-color: black;
  color: white;
  padding: 7px 7px;
  transition: background 0.5s ease-in-out;
  width: 18%;
  border-radius: 5px;
  &:hover {
    color: black;
    background: #fff;
    cursor: pointer;
  }

`;

export const BottomImage = styled.img`
    position: absolute;
    width: 100%;
    max-height: 45%;
    bottom: 0%; 

`;
