import React, { useEffect, useState } from "react";
import { Container, Title, LeftWrapper } from "./OrderHistory.style";
import axios from "axios";
import LinkToOrder from "../components/LinkToOrder";

export default function OrderHistory() {
	const [orderList, setOrderHistory] = useState([]);

	useEffect(() => {
		let isMounted = true;
		const fetchOrder = async () => {
			try {
				const res = await axios.get("/order");
				if (isMounted) {
					setOrderHistory(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchOrder();
		return () => {
			isMounted = false;
		};
	}, [orderList]);

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
		const row = array.map((order) => <LinkToOrder order={order} />);
		return row;
	} catch (error) {
		console.log(error);
	}
}
