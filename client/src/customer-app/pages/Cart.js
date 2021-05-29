import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
	Container,
	Status,
	OrderList,
	OrderItem,
	LeftWrapper,
	RightWrapper,
	Division,
	BreakLine,
	DivisionBottom,
	Logo,
	Total,
	TotalPrice,
	DiscountMessage,
	MyButton,
} from "./Cart.style";
import coffeeMachine from "../../images/coffeeMachine.png";
import { objectIsEmpty } from "../../utilities/Utils";

export default function Cart() {
	const history = useHistory();
	var isUpdate = false;

	// Fetch the order details from the local storage.
	// This will be replaced with cookie in later version of implementation.
	const orderList = JSON.parse(localStorage.getItem("order"));
	const orderPrice = JSON.parse(localStorage.getItem("price"));
	let orderUpdated = null;

	if (localStorage.getItem("curr_order")) {
		isUpdate = true;
		orderUpdated = JSON.parse(localStorage.getItem("curr_order"));
		console.log(orderUpdated);
	}

	// Organise the order details and send to the database.
	const makeOrder = async (order) => {
		try {
			console.log(order);
			const userData = JSON.parse(localStorage.getItem("userData"));
			console.log(userData);
			const data = { vendorId: "60939f9aa6762b64b82547b3" };

			if (!objectIsEmpty(order)) {
				data["foodItems"] = order;
			}
			const res = await axios.post("/order", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			localStorage.removeItem("order");
			localStorage.removeItem("price");
			console.log(res);
		} catch (error) {
			console.log(error.response.data);
		}
		return;
	};

	const updateOrder = async (order) => {
		const userData = JSON.parse(localStorage.getItem("userData"));
		console.log(userData);
		const data = { vendorId: orderUpdated["vendorId"]["_Id"] };
		const orderId = orderUpdated["orderId"];
		try {
			if (!objectIsEmpty(order)) {
				data["foodItems"] = order;
			}
			const res = await axios.put(`/order/${orderId}`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			localStorage.removeItem("order");
			localStorage.removeItem("price");
			localStorage.removeItem("curr_order");
			console.log(res);
		} catch (error) {
			console.log(error.response.data);
		}
		return;
	}

	var totalPrice = 0;
	Object.entries(orderPrice).map((item) => {
		return (totalPrice += parseFloat(item[1]));
	});

	// Render
	return (
		<Container>
			{isUpdate ? <Status>Confirm your update</Status> : <Status>Confirm your order</Status>}
			<Division>
				<LeftWrapper>
					{Object.entries(orderList).map(function (item, key) {
						return (
							<OrderList key={key}>
								<OrderItem>
									{item[1]} x {item[0]}
								</OrderItem>
							</OrderList>
						);
					})}
				</LeftWrapper>
				<RightWrapper>
					{Object.entries(orderPrice).map(function (item, key) {
						return (
							<OrderList key={key}>
								<OrderItem>$ {item[1]}</OrderItem>
							</OrderList>
						);
					})}
				</RightWrapper>
			</Division>
			<BreakLine />
			<DivisionBottom>
				<div>
					<DiscountMessage>
						20% discount applies if the order<br></br>takes more than 15 mins
					</DiscountMessage>
				</div>
				<div>
					<Total>Total</Total>
					<TotalPrice>${totalPrice}</TotalPrice>
				</div>
			</DivisionBottom>
			<Logo alt="machine-logo" src={coffeeMachine} />
			{isUpdate ? 
				<MyButton
				onClick={() => { 
					updateOrder(orderList);
					history.push("/customer/orderHistory");
				}}>
				update order
				</MyButton> :
				<MyButton
				onClick={() => { 
					makeOrder(orderList);
					history.push("/customer/orderHistory");
				}}>
				make order
				</MyButton>
				}
			
		</Container>
	);
}
