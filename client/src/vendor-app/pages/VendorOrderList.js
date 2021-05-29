import React, { useEffect, useState } from "react";
import { Container, Title, LeftWrapper } from "./VendorOrderList.style";
import axios from "axios";
import LinkToOrder from "../components/LinkToOrder";
import FilterOrder from "../../shared/components/FilterOrder";

export default function VendorOrderList() {
	const [orderList, setOrderHistory] = useState([]);
	const [stat, setStat]=useState("");

	const changeFilter = (event) => {
		console.log(event.target.value);
		setStat(event.target.value);
	}

	useEffect(() => {
		let isMounted = true;
		console.log("Fetching vendor orders");
		const fetchOrder = async () => {
			try {
				const res = await axios.get("/order");
				if (isMounted) {
					setOrderHistory(res.data);
				}
				setStat("active");
			} catch (error) {
				console.log(error.response.data);
			}
		};
		fetchOrder();
		// console.log(orderList);
		return () => {
			isMounted = false;
		};
	}, [orderList]);
	
	
	

	return (
		<Container>
			<LeftWrapper>
				<br />
				<Title>Outstanding Orders</Title>
				<FilterOrder changeFilter={changeFilter}/>
			</LeftWrapper>
			<hr />
			<br />
			{renderLaptopOrder(orderList, stat)}
			<br />
		</Container>
	);
}

function renderLaptopOrder(array, stat) {
	
	
	try {
		const row = array.map((order, key) => (
			<LinkToOrder key={key} order={order} stat={stat} />
		));
		return row;
	} catch (error) {
		console.log(error);
	}
}
