import React, { useEffect, useState } from "react";
import { Container, Title, LeftWrapper } from "./VendorOrderList.style";
import axios from "axios";
import LinkToOrder from "../components/LinkToOrder";

export default function VendorOrderList() {
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
        <br />
        <Title>Outstanding Orders</Title>
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
    const row = array.map((order, key) => <LinkToOrder key={key} order={order} />);
    return row;
  } catch (error) {
    console.log(error);
  }
}
