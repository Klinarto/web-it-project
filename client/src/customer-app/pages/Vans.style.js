import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  transform: translate(-50%, 50%) ;
  left: 50%;
  bottom: 50%;
  transition: 3s ease-in-out;
  z-index: 10;
  background-color: white;
  width: 500px;
  max-width: 80%;
  border: 1px solid black;
  border-radius: 10px;
  &:active{
    transform: translate(-50%, -50%) scale(1);
  }
`;
export const PopUpHeader = styled.div`
 padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
`;


export const PopUpTitle = styled.div`
 font-size: 1.25rem;
  font-weight: bold;
`;

export const PopUpCloseButton = styled.button`
cursor: pointer;
  border: none;
  outline: none;
  background: none;
  font-size: 1.25rem;
  font-weight: bold;
`;


export const PopUpBody = styled.div`
  padding: 10px 15px;

`;

export const Overlay = styled.div`
  position: fixed;
  opacity: 0;
  transition: 200ms ease-in-out;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  pointer-events: none;
  &::active{
    opacity: 1;
  pointer-events: all;
  }
`;


export const Aaaa = styled.div`
 position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
export const Bbbb = styled.div`
  width: 60%;
  min-height: 200px;
  background-color: white;
  padding: 25px;
`;


