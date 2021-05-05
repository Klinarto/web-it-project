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

	return <h1>Test</h1>;
	// const menu = getMenu();
	// const mobileSize = useMediaQuery(`(min-width: ${"768px"})`);
	// return (
	// 	<Wrapper>
	// 		<h1>Menu </h1>
	// 		<table>
	// 			{mobileSize ? renderLaptopMenu(menu) : renderPhoneMenu(menu)}
	// 		</table>
	// 	</Wrapper>
	// );
}

function getMenu() {
	return [
		{
			name: "cappuccino",
			price: 4.5,
			image:
				"https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3034&q=80",
			detail:
				"a double shot of espresso with equal steamed milk and foam",
		},

		{
			name: "latte",
			price: 4.5,
			image:
				"https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3024&q=80",
			detail:
				"a double shot of espresso with steamed milk and small layer of foam",
		},

		{
			name: "flat white",
			price: 4.5,
			image:
				"https://images.unsplash.com/photo-1577968897966-3d4325b36b61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
			detail: "a double shot of espresso with flat steamed milk",
		},

		{
			name: "long black",
			price: 4.0,
			image:
				"https://images.unsplash.com/photo-1551030173-122aabc4489c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
			detail: "double expresso on hot water at 90 degrees celcius ",
		},
	];
}

function renderLaptopMenu(menu) {
	const row = menu.map((item) => renderItem(item));
	return row;
}

function renderItem(item) {
	const { name, price, image, detail } = item;
	return (
		<TDPC>
			<InTR>
				<ImageBig src={image} />
			</InTR>
			<tr>
				<p>
					<b>{name} </b>
					<Price>{price}</Price>
					<br></br>
					{detail}
					<br></br>
					<hr></hr>
				</p>
			</tr>
		</TDPC>
	);
}

function renderPhoneMenu(menu) {
	return menu.map((item) => {
		const { name, price, image, detail } = item;
		return (
			<tr>
				<TD>
					<p>
						<b>{name} </b>
						<Price>{price}</Price>
						<br></br>
						{detail}
						<br></br>
						{/* <hr></hr> */}
					</p>
				</TD>
				<td>
					<Image src={image} />
				</td>
			</tr>
		);
	});
}
