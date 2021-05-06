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
import Link from "react-router-dom/Link";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuItem from "../components/MenuItem";

export default function Menu() {
	var orderList = {};
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

	// Sets up the modal for cart
	// const useStyles = makeStyles((theme) => ({
	// 	modal: {
	// 		display: 'flex',
	// 		alignItems: 'center',
	// 		justifyContent: 'center',
	// 	},
	// 	paper: {
	// 		backgroundColor: theme.palette.background.paper,
	// 		border: '2px solid #000',
	// 		boxShadow: theme.shadows[5],
	// 		padding: theme.spacing(2, 4, 3),
	// 	},
	// 	}));
	// const [open, setOpen] = useState(false);
	// const handleOpen = () => {finalOrder(order); setOpen(true)};
	// const handleClose = () => {setOpen(false)};

	useEffect(() => {
		let isMounted = true;
		const fetchMenu = async () => {
			try {
				const res = await axios.get("/menu");
				// console.log(res.data);
				if (isMounted) {
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
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchMenu();
		return () => {
			isMounted = false;
		};
	}, [menu]);

	useEffect(() => {
		//console.log(order);
		return () => {};
	}, [order]);

	const finalOrder = (order) => {
		for (const [key, value] of Object.entries(order)) {
			if (value > 0) {
				orderList[key] = value;
			}
		}

		localStorage.setItem("order", JSON.stringify(orderList));
	};

	//const mobileSize = useMediaQuery(`(min-width: ${"768px"})`);
	return (
		<Wrapper>
			<DIV>
				<LeftWrapper>
					<Title>Menu</Title>
				</LeftWrapper>
				<RightWrapper>
					<Link to="/customer/cart">
						<MyButton
							aria-label="Go to cart"
							onClick={() => {
								finalOrder(order);
							}}
						>
							<ShoppingCartIcon />
						</MyButton>
					</Link>
					{/* <MyButton 
						aria-label="Go to cart" 
						onClick={event =>  window.location.href='./cart'}
							//handleOpen
						>
						<ShoppingCartIcon/>
					</MyButton> */}
					{/* <Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={useStyles().modal}
						open={open}
						onClose={handleClose}
						closeAfterTransition
					>
						<Fade in={open}>
						<div className={useStyles().paper}>
							<h2 id="transition-modal-title">Transition modal</h2>
							<p id="transition-modal-description"></p>
							<button onClick={() => makeOrder(orderList)}>send</button>
						</div>
						</Fade>
					</Modal> */}
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
// function renderItem(item) {
// 	var quantity = 0;
// 	return (
// 		<TDPC>
// 			<InTR>
// 				<ImageBig src={item["image"]} />
// 			</InTR>
// 			<tr key={item._id}>
// 				<p>
// 					<b>{item["name"]} </b>
// 					<Price>{item["price"]}</Price>
// 					<br />
// 					{item["detail"]}
// 					<br />
// 					<hr />
// 				</p>
// 			</tr>
// 			<Buttons>
// 				<AddItem>-</AddItem>
// 				{quantity}
// 				<AddItem>+</AddItem>
// 			</Buttons>
// 		</TDPC>
// 	);
// }

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
