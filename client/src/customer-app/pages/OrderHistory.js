import React, { useEffect, useState } from "react";

import { Container, Title, Wrapper } from "./OrderHistory.style";
import axios from "axios";
import LinkToOrder from "../components/LinkToOrder";
import FilterOrder from "../../shared/components/FilterOrder";

export default function OrderHistory() {
	const [orderList, setOrderHistory] = useState([]);
	const [stat, setStat] = useState("active");

	const changeFilter = (event) => {
		console.log(event.target.value);
		setStat(event.target.value);
	};

	useEffect(() => {
		let isMounted = true;
		console.log("Fetching customer orders");
		const fetchOrder = async () => {
			try {
				const res = await axios.get("/order");
				if (isMounted) {
					setOrderHistory(res.data.reverse());
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
			<Wrapper>
				<Title>Orders</Title>
				<FilterOrder changeFilter={changeFilter} />
				{renderLaptopOrder(orderList, stat)}
			</Wrapper>
		</Container>
	);
}

function renderLaptopOrder(array, stat) {
	if (array) {
		const row = array.map((order, key) => (
			<LinkToOrder key={key} order={order} stat={stat} />
		));
		return row;
	}
}
