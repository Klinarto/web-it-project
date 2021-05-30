import styled from "styled-components";
import { device } from "../../shared/components/device";


export const TopWrapper = styled.div`
  display: block;
  padding-top: 16px;

  @media ${device.mobileS} {
		padding-left:30.3%;
	}

	@media ${device.laptop} {
    padding-left: 45%;
  }

  & > * {
    align-items: center;
    text-align: center;
  }
`;


export const Button = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  background-color: #aad9cd;
  color: white;
  padding: 7px 14px;
  transition: background 0.5s ease-in-out;
  width: 37%;
  border-radius: 10px;
  border: none;
  &:hover {
    color: black;
    background: #fff;
    cursor: pointer;
  }
`;

