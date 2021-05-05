import React, { useEffect, useState } from "react";
import {
	Image,
	DIV,
	TDPC,
	Wrapper,
	TD,
	InTR,
	Price,
	ImageBig,
	MyButton,
	LeftWrapper,
	RightWrapper,
	Title,
	Buttons
} from "./Menu.style";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function Menu() {
	const [menu, setMenu] = useState({});

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const res = await axios.get("/menu");
				console.log(res.data);
				let sorted = {};
				res.data.forEach((menuItem) => {
					if (menuItem.type in sorted) {
						sorted[menuItem.type].push(menuItem);
					} else {
						sorted[menuItem.type] = [menuItem];
					}
				});
				console.log(sorted);
				setMenu(sorted);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMenu();
		console.log(menu)
		return () => {};
	}, []);


	const mobileSize = useMediaQuery(`(min-width: ${"768px"})`);
	return (
		<Wrapper>
			<DIV>
				<LeftWrapper>
					<Title>Menu</Title>
				</LeftWrapper>
				<rightWrapper>
					<Buttons>
						<MyButton>Place order</MyButton>
						<MyButton>Go to cart</MyButton>
					</Buttons>
				</rightWrapper>
			</DIV>
			<hr/>
			<br/>
			<table>
				{renderLaptopMenu(menu['beverage'])}
			</table>
			<br/>
			<table>
				{renderLaptopMenu(menu['food'])}
			</table>
		</Wrapper>
	);
}

function renderLaptopMenu(array) {
	try {
		const row = array.map((item) => renderItem(item));
		return row;
	}
	catch (error) {
		console.log(error);
	}
}

function renderItem(item) {
	return (
		<TDPC>
			<InTR>
				<ImageBig src={item['image']} />
			</InTR>
			<tr>
				<p>
					<b>{item['name']} </b>
					<Price>{item['price']}</Price>
					<br></br>
					{item['detail']}
					<br></br>
					<hr></hr>
				</p>
			</tr>
		</TDPC>
	);
}

// function renderPhoneMenu(menu) {
// 	return menu.map((item) => {
// 		const { name, price, image, detail } = item;
// 		return (
// 			<tr>
// 				<TD>
// 					<p>
// 						<b>{name} </b>
// 						<Price>{price}</Price>
// 						<br></br>
// 						{detail}
// 						<br></br>
// 						{/* <hr></hr> */}
// 					</p>
// 				</TD>
// 				<td>
// 					<Image src={image} />
// 				</td>
// 			</tr>
// 		);
// 	});
// }
