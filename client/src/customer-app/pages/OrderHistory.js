import React, { useEffect, useState } from "react";
import {Container } from "./OrderHistory.style"
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function OrderHistory() {
	const [orderList, setOrderHistory] = useState({});

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const res = await axios.get("/order");
				console.log(res.data);
				setOrderHistory(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchOrder();
		console.log(orderList)
		return () => {};
	}, []);

    return (
		<Container>
			<hr/>
			<br/>
			<table>
				{renderLaptopOrder(orderList)}
			</table>
			<br/>
		</Container>
	);
}

function renderLaptopOrder(array) {
	try {
		const row = array.map((order) => renderOrder(order));
		return row;
	}
	catch (error) {
		console.log(error);
	}
}

function renderOrder(item) {
    const { orderId , customerID, vendorID, foodItems, status, orderCost, totalCost, createdAt, updatedAt } = item;
	return (
		<table>
			<tr>
				<p>
					<b>{foodItems} </b>
					{status}
					<br/>
                    {totalCost}
                    <br/>
					{createdAt}
					<br/>
					<hr/>
				</p>
			</tr>
		</table>
	);
}