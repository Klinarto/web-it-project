import React, { useEffect, useState } from "react";
import {
	Container,
	OrderTitle,
	OrderList,
	FoodItem,
	Division,
	OrderItem,
	Title,
	LeftWrapper,
	MyButton,
} from "./OrderHistory.style";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { parseDate } from "../utilities/Utils";

export default function OrderHistory() {
	const [orderList, setOrderHistory] = useState([]);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const res = await axios.get("/order");
				setOrderHistory(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchOrder();
		console.log(orderList);
		return () => {};
	}, []);

	return (
		<Container>
			<LeftWrapper>
				<br />
				<Title>Orders</Title>
			</LeftWrapper>
			<hr />
			<br />
			{renderLaptopOrder(orderList)}
			<br />
		</Container>
	);
}

function renderLaptopOrder(array) {
	try {
		const row = array.map((order) => renderOrder(order));
		return row;
	} catch (error) {
		console.log(error);
	}
}

function renderOrder(order) {
	console.log(order);
	const {
		orderId,
		customerId,
		vendorId,
		foodItems,
		status,
		orderCost,
		totalCost,
		createdAt,
		updatedAt,
	} = order;

	return (
		<Container>
			<Link
				to="/customer/order"
				style={{ textDecoration: "none", color: "black" }}
			>
				<div>
					<OrderTitle>Order {orderId} </OrderTitle>
					<hr />
					<Division>
						<innerDiv>
							<OrderList>
								<OrderItem>
									<b>Vendor:</b> {vendorId.name}
								</OrderItem>
								<OrderItem>
									<b>Status:</b> {status}
								</OrderItem>
							</OrderList>
						</innerDiv>

						<innerDiv>
							<OrderItem>
								<b>Items ordered: </b>
							</OrderItem>
							{Object.keys(foodItems).map((key, i) => (
								<FoodItem>
									{foodItems[key]} {key}
								</FoodItem>
							))}
						</innerDiv>

						<innerDiv>
							<OrderItem>
								<b>Total Cost:</b> $ {totalCost}
							</OrderItem>
							<OrderItem>
								<b>Created at:</b> {createdAt}
							</OrderItem>
						</innerDiv>
						<br />
					</Division>
					<hr />
				</div>
			</Link>
		</Container>
	);
}
