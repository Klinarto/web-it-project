import styled from "styled-components";

export const PopUpHeader = styled.div`
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid black;
  background-color:  #aad9cd;
  border-width: 0.5ch;
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

export const RightDetail = styled.div`
	width: 75%;
`;
export const Title = styled.h1`
	/* font-family: initial; */
`;

export const PopUpBody = styled.div`
	padding: 10px 15px;

	
`;

export const OrderButton = styled.button`
	cursor: pointer;
	border: none;
	outline: none;
	background: none;
	font-size: 1.25rem;
	font-weight: bold;
  background-color: #aad9cd;

  &:hover {
		background-color: #9bcebd;

	}
`;
