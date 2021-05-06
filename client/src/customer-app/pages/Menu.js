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
	Buttons,
	AddItem,
} from "./Menu.style";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuItem from "../components/MenuItem";

export default function Menu() {
	const [menu, setMenu] = useState({});
	const [order, setOrder] = useState({});
	function renderLaptopMenu(array) {
		try {
			const row = array.map((item) => (
				<MenuItem item={item} setOrder={setOrder} />
			));
			return row;
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const res = await axios.get("/menu");
				// console.log(res.data);
				let sorted = {};
				res.data.forEach((menuItem) => {
					if (menuItem.type in sorted) {
						sorted[menuItem.type].push(menuItem);
					} else {
						sorted[menuItem.type] = [menuItem];
					}
				});
				// console.log(sorted);
				setMenu(sorted);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMenu();
		return () => {};
	}, [menu]);

	useEffect(() => {
		console.log(order);
		return () => {};
	}, [order]);

	const mobileSize = useMediaQuery(`(min-width: ${"768px"})`);
	return (
		<Wrapper>
			<DIV>
				<LeftWrapper>
					<Title>Menu</Title>
				</LeftWrapper>
				<RightWrapper>
					<Buttons>
						<MyButton>Place order</MyButton>
						<MyButton>Go to cart</MyButton>
					</Buttons>
				</RightWrapper>
			</DIV>
			<hr />
			<br />
			<table>{renderLaptopMenu(menu["beverage"])}</table>
			<br />
			<table>{renderLaptopMenu(menu["food"])}</table>
		</Wrapper>
	);
}
function renderItem(item) {
	var quantity = 0;
	return (
		<TDPC>
			<InTR>
				<ImageBig src={item["image"]} />
			</InTR>
			<tr key={item._id}>
				<p>
					<b>{item["name"]} </b>
					<Price>{item["price"]}</Price>
					<br />
					{item["detail"]}
					<br />
					<hr />
				</p>
			</tr>
			<Buttons>
				<AddItem>-</AddItem>
				{quantity}
				<AddItem>+</AddItem>
			</Buttons>
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
