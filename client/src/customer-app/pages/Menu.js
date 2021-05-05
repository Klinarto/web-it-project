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

		return () => {};
	}, []);


	const something = menu;
	const mobileSize = useMediaQuery(`(min-width: ${"768px"})`);
	return (
		<Wrapper>
			<h1>Menu</h1>
			<hr/>
			<br/>
			<table>
				{renderLaptopMenu(something['beverage'])}
			</table>
			<table>
				{renderLaptopMenu(something['food'])}
			</table>
		</Wrapper>
	);
}

function renderLaptopMenu(array) {
	const row = array.map((item) => renderItem(item));
	return row;
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
