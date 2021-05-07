import React, { useEffect, useState } from "react";
import { Container, OrderTitle,OrderList,FoodItem, Division, OrderItem, Title, LeftWrapper } from "./OrderHistory.style";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

	const orderList_dummy = [
		{
			orderId: "1",
			customerId: { $oid: "608a752474f5f76a4894472f" },
			vendorId: { $oid: "6080184f1cb9346538047c22" },
			foodItems: { "flat white": 3, cappuccino: 2 },
			status: "pending",
			orderCost: 22.5,
			createdAt: { $date: "2021-04-29T10:50:31.549Z" },
			updatedAt: { $date: "2021-04-29T11:18:23.331Z" },
		},
	];

	return (
		<Container>
            <LeftWrapper>
            <br/>
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
	console.log(vendorId);

  return (
    <div>
    
    <OrderTitle>Order {orderId} </OrderTitle> 
    <hr/>
    <Division>
    <innerDiv>
    <OrderList>
        <OrderItem><b>Vendor:</b> {vendorId.name}</OrderItem>
        <OrderItem><b>Status:</b> {status}</OrderItem>
    </OrderList>
    </innerDiv>

    <innerDiv>
    <OrderList>
    <OrderItem><b>Items ordered: </b></OrderItem>
    {Object.keys(foodItems).map((key, i) => (
        <FoodItem>
        {foodItems[key]}  {key}
        </FoodItem>
    ))}
    </OrderList>
    
    </innerDiv>

    <innerDiv>
    <OrderList>
    <OrderItem><b>Total Cost:</b> {totalCost}</OrderItem>
    <OrderItem><b>Created at:</b> {createdAt}</OrderItem>
    </OrderList>
    </innerDiv>

    <br/>
    </Division>
    <hr/>
    </div>
  );
}
