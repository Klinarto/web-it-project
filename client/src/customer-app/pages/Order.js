import React, { Fragment, useEffect, useState } from "react";
import Interval from "../components/Interval";
import coffeeMachine from "../../coffeeMachine.png";
import {
	Container,
	Status,
	Division,
	OrderList,
	OrderItem,
	BreakLine,
	DivisionBottom,
	DiscountMessage,
	Total,
	TotalPrice,
	Logo,
	MyButton,
} from "./Order.style";
import axios from "axios";
import { useLocation } from "react-router";

export function Order(props) {
	const [menu, setMenu] = useState(null);
	const [order, setOrder] = useState(null);

	const pathname = useLocation().pathname;
	const orderId = pathname.substring(pathname.lastIndexOf("/") + 1);

	// Quick solution to get a price: Fetch the whole menu data. Will be fixed soon.
	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const res = await axios.get("/menu");
				setMenu(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		const fetchOrder = async () => {
			try {
				const res = await axios.get(`/order/${orderId}`);
				setOrder(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMenu();
		fetchOrder();
		return () => {};
	}, []);

	// console.log(foodItems);
	// console.log(menu);
	// console.log("menu type", typeof menu);

	const displayOrder = () => {
		if (order) {
			const { foodItems, totalCost } = order;
			console.log(menu);
			let prices = [];
			menu.forEach((item) => {
				console.log(item);
				console.log(Object.keys(foodItems));
				if (Object.keys(foodItems).includes(item.name)) {
					prices.push(item.price);
				}
			});

			console.log(prices);

			return (
				<Fragment>
					<Division>
						<div>
							{Object.entries(foodItems).map(function ([item, quantity], key) {
								return (
									<OrderList key={key}>
										<OrderItem>
											{quantity} x {item}
										</OrderItem>
									</OrderList>
								);
							})}
						</div>
						<div>
							{prices.map(function (price, key) {
								return (
									<OrderList key={key}>
										<OrderItem>$ {price}</OrderItem>
									</OrderList>
								);
							})}
						</div>
					</Division>
					<BreakLine />
					<DivisionBottom>
						<div>
							<DiscountMessage>
								20% discount applies if the order<br></br>takes more than 15
								mins
							</DiscountMessage>
						</div>
						<div>
							<Total>Total</Total>
							<TotalPrice>${totalCost}</TotalPrice>
						</div>
					</DivisionBottom>
				</Fragment>
			);
		}
		return null;
	};

	return (
		<Container>
			<Status>Preparing your order...</Status>
			{displayOrder()}
			<Logo alt="machine-logo" src={coffeeMachine} />
			<Interval />
			<MyButton>Change order</MyButton>
			<MyButton>Cancel order</MyButton>
		</Container>
	);
}

export default Order;
