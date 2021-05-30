import styled from "styled-components";

export const Container = styled.div`
  height: 90vh;
  position: relative;

  & > {
    align-items: center;
    text-align: center;
  }
`;

export const TopWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  width: 100%;
`;
export const TopImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const Title = styled.h1`
  margin-bottom: 32px;
`;

export const Button = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;

  background-color: black;
  color: white;
  padding: 15px 32px;
  text-align: center;
  transition: background 0.5s ease-in-out;
  border-radius: 5px;
  &:hover {
    color: black;
    background: #fff;
    cursor: pointer;
  }
`;

export const BottomImage = styled.img`
  width: 100%;
  height: 50%;
  bottom: 0%;
`;
