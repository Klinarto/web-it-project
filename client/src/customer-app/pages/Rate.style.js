import styled from "styled-components";

export const Container = styled.div`
  height: 93vh;
  position: relative;
  display: flex;
`;

export const TopWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
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
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0%;
`;
