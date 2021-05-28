import React, { Fragment, useEffect, useState } from "react";
import Interval from "../../shared/components/Interval";
import coffeeMachine from "../../images/coffeeMachine.png";
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
export function Order() {
	const [menu, setMenu] = useState(null);
	const [order, setOrder] = useState(null);
	const [late, setLate] = useState(false);
	const [status, setStatus] = useState("");

	const pathname = useLocation().pathname;
	const orderId = pathname.substring(pathname.lastIndexOf("/") + 1);

	// Quick solution to get a price: Fetch the whole menu data. Will be fixed soon.
	useEffect(() => {
		let isMounted = true;
		const fetchMenu = async () => {
			try {
				const res = await axios.get("/menu");
				if (isMounted) {
					setMenu(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		const fetchOrder = async () => {
			try {
				const res = await axios.get(`/order/${orderId}`);
				if (isMounted) {
					setOrder(res.data);
					setStatus(res.data.status);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchMenu();
		fetchOrder();
		return () => {
			isMounted = false;
		};
	}, [orderId]);

	useEffect(() => {
		const updateOrderCost = async (newCost) => {
			try {
				const data = { totalCost: newCost };
				const res = await axios.put(`/order/${orderId}`, data, {
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		};
		if (order && late) {
			const newTotalCost = parseFloat((order.orderCost * 0.8).toFixed(2));

			setOrder((prevOrder) => {
				return { ...prevOrder, totalCost: newTotalCost };
			});
			updateOrderCost(newTotalCost);
		}
		return () => {};
	}, [late]);

	const cancelOrder = async () => {
		const data = { status: "cancelled" };
		try {
			const res = await axios.put(`/order/${orderId}`, data, {
				headers: { "Content-Type": "application/json" },
			});
			console.log(res);
			setStatus("cancelled");
		} catch (error) {
			console.log(error);
		}
	};

	const displayOrderInteractions = (updatedAt) => {
		let timer = <Interval updatedAt={updatedAt} setLate={setLate} />;
		let changeOrderButton = <MyButton>Change order</MyButton>;
		let cancelOrderButton = (
			<MyButton onClick={() => cancelOrder()}>Cancel order</MyButton>
		);
		if (status == "cancelled") {
			timer = null;
			changeOrderButton = null;
			cancelOrderButton = null;
		}
		if (late) {
			timer = null;
		}
		return (
			<Fragment>
				{timer}
				{changeOrderButton}
				{cancelOrderButton}
			</Fragment>
		);
	};

	const displayOrderStatus = () => {
		let msg = "Preparing your order...";
		switch (status) {
			case "cancelled":
				msg = "Order cancelled";
				break;
			case "ready":
				msg = "Order ready";
				break;
			case "declined":
				msg = "Order declined";
				break;
		}

		return <Status>{msg}</Status>;
	};

	const displayOrder = () => {
		if (order && menu) {
			const { foodItems, totalCost, updatedAt } = order;
			let prices = [];
			menu.forEach((item) => {
				if (Object.keys(foodItems).includes(item.name)) {
					prices.push(item.price);
				}
			});

			// console.log(prices);

			return (
				<Fragment>
					{displayOrderStatus()}
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
							{late ? (
								<DiscountMessage>
									Your order has been discounted
								</DiscountMessage>
							) : (
								<DiscountMessage>
									20% discount applies if the order<br></br>takes more than 15
									mins
								</DiscountMessage>
							)}
						</div>
						<div>
							<Total>Total</Total>
							<TotalPrice>${totalCost}</TotalPrice>
						</div>
					</DivisionBottom>
					<Logo alt="machine-logo" src={coffeeMachine} />
					{displayOrderInteractions(updatedAt)}
				</Fragment>
			);
		}
		return <h1>Loading</h1>;
	};

	return <Container>{displayOrder()}</Container>;
}

export default Order;
