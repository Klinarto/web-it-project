import styled from "styled-components";


export const Float_Container = styled.div`
  
`;
export const Container = styled.div`
  position:relative;
  width: 30%;
  float: left;
  
`;

export const Title = styled.span`
  font-size:24px;
  text-align: left;
  padding-left:20px;
`;
export const CurrentLocationButton = styled.button`
  float:right;

`;


export const LeftDetail = styled.div`

`;

export const OrderButton = styled.button`
  position: fixed;
  bottom: 0;
  height: 12vh; 
  width: 30%;
  border-radius:5px;
  background-color:white;
  &:focus {
    color: white;
    background: black;
    cursor: pointer;
  }

`;

export const VanButton = styled.button`
  width: 100%;
  height: 15vh; 
  border-radius:5px;
  background-color:white;
  border-color:white;

  &:focus {
    color: black;
    background: #aad9cd;
    cursor: pointer;
  }
  
`;


export const VanButtonTitle = styled.p`
    text-align: left;

  
`;

export const VanButtonDistance = styled.p`
    text-align: right;

  
`;