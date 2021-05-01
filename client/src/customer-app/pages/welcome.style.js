import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0;
  padding: 0;
`;

export const LeftWrapper = styled.div`
  min-width: 40%;
  margin-bottom:4%;
    
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
    color:black;
    background: #fff;
  }  
`;

export const RightWrapper = styled.div`
  min-width: 60%;
  display: grid;
  height: 100%;
  
  
`;
export const RightImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  // margin: auto;
`;

export const HeaderWrapper = styled.h1`
  color: grey;
`;
