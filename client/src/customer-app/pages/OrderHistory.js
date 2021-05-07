import React, { useEffect, useState } from "react";
import { Container, OrderTitle,OrderList,FoodItem, Division, OrderItem, Title, LeftWrapper, MyButton } from "./OrderHistory.style";
import axios from "axios";
import LinkToOrder from "../components/LinkToOrder";
import { Link } from "react-router-dom";

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
		return () => {};
	}, []);

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
		const row = array.map((order) => ( <LinkToOrder order = {order} /> ));
		return row;
	} catch (error) {
		console.log(error);
	}
}