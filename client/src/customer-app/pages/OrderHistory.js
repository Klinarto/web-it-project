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
				setOrderHistory(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchOrder();
		console.log(orderList)
		return () => {};
	}, []);

    const orderList_dummy = [
        {
            orderId:"1",
            customerId:{"$oid":"608a752474f5f76a4894472f"},
            vendorId:{"$oid":"6080184f1cb9346538047c22"},
            foodItems:{"flat white":3,"cappuccino":2},
            status:"pending",
            orderCost:22.5,
            createdAt:{"$date":"2021-04-29T10:50:31.549Z"},
            updatedAt:{"$date":"2021-04-29T11:18:23.331Z"},
        }
    ];

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

function renderOrder(order) {
    console.log(order)
    const { orderId , customerId, vendorId, foodItems, status, orderCost, totalCost, createdAt, updatedAt } = order;
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