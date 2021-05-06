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
            {renderLaptopOrder(orderList)}
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
    const { orderId , customerId, vendorId, foodItems, status, orderCost, totalCost, createdAt, updatedAt } = item;
	console.log(item)
    console.log(foodItems)
    
    return (
		<table>
            <tr>
            <h3>Order {orderId} </h3>
            <br/>
            <b>Vendor: </b> {vendorId}
            <br/>
            <b>Items ordered: </b>
            <ul>
            {
                Object.keys(foodItems).map((key, i) => (
                <p key={i}>
                    <span>{key}:</span>
                    <span>{foodItems[key]}</span>
                </p>
                ))}
            </ul>
            </tr>
			<tr>
				<p>
					<b>Status:</b> {status}
					<br/>
                    <b>Total Cost:</b> {totalCost}
                    <br/>
					<b>Created at:</b> {createdAt}
					<br/>
					<hr/>
				</p>
			</tr>
		</table>
	);
}