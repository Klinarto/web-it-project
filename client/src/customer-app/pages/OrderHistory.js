import React, { useEffect, useState } from "react";
import { Container, Title, } from "./OrderHistory.style";
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

        <br />
        <Title>Orders</Title>

      {renderLaptopOrder(orderList)}

    </Container>
  );
}

function renderLaptopOrder(array) {
  try {
    const row = array.map((order, key) => <LinkToOrder key={key} order={order} />);
    return row;
  } catch (error) {
    console.log(error);
  }
}
