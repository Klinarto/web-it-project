import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Title = styled.h1`
	font-size: 32px;
`;

export const Division = styled.div`
	/* max-height: 20%; */
	flex-direction: column;
	flex: 3;

	/* overflow-y: auto; */
	display: flex;
	justify-content: space-between;
	padding: 10px;

	&:hover {
	  cursor: pointer;
      background-color: lightgrey;
    }
`;

// export const Img = styled.img`
// 	position: absolute;
// 	/* object-fit: cover;
// 	object-position: 15% 85%; */
// 	display: flex;
// 	justify-Content: center;
// 	align-Items: center;
// 	overflow: hidden;
// 	height: 80vh;

// 	/* @media ${device.mobileL} {
// 		max-width: 0vw;
// 	}

// 	@media ${device.laptop} {
// 		max-width: 50vw;
// 	} */
// `;

export const UL = styled.li`
	list-style-type: none;
	margin-top: 2%;
	margin-bottom: 2%;
`;

export const ImageBig = styled.img`
	display: block;
	/* width: 300px; */
	width: 100%;

	object-fit: cover;
	align-self: center;

	@media ${device.mobileS} {
		height: 300px;
	}
	@media ${device.mobileL} {
		height: 300px;
	}
	@media ${device.mobileM} {
		height: 300px;
	}

	@media ${device.laptop} {
		height: 200px;
	}
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

	@media ${device.mobileS} {
		grid-template-columns: 1fr;
		grid-gap: 20px;
	}
	@media ${device.mobileM} {
		grid-template-columns: 1fr;
		grid-gap: 20px;
	}

	@media ${device.tablet} {
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-gap: 20px;
	}
	@media ${device.laptop} {
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-gap: 20px;
	}
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
