import styled from "styled-components";

export const Float_Container = styled.div``;
export const Container = styled.div`
  position: relative;
  width: 30%;
  float: left;
`;

export const Title = styled.p`
  text-align: center;
`;

export const LeftDetail = styled.div``;

export const MyButton = styled.button`
  position: fixed;
  bottom: 0;
  height: 12vh;
  width: 30%;
`;

export const VanButton = styled.button`
  width: 100%;
  height: 60vh;
  &:focus {
    color: white;
    background: red;
    cursor: pointer;
  }
`;
