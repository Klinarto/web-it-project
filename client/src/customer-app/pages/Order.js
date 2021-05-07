import React, { useEffect, useState } from "react";
import Interval from "../components/Interval";
import coffeeMachine from "../../coffeeMachine.png";
import {
	Container,
	Status,
	Division,
	OrderList,
	OrderItem,
	OrderPrice,
	BreakLine,
	DivisionBottom,
	DiscountMessage,
	Total,
	TotalPrice,
	Logo,
	MyButton,
} from "./Order.style";
import axios from "axios";
import { useLocation } from "react-router";








export function Order(props) {
	const [menu, setMenu] = useState({});

  // Quick solution to get a price: Fetch the whole menu data. Will be fixed soon.
  useEffect(() => {
    let isMounted = true;
    const fetchMenu = async () => {
      try {
        const res = await axios.get("/menu");
        if (isMounted) {  
					setMenu(res.data);        
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenu();
    return () => {
      isMounted = false;
    };
  }, [menu]);

	

	const order = useLocation().state;
	console.log(order);
	const {
		createdAt,
		customerId,
		foodItems,
		orderCost,
		orderId,
		status,
		totalCost,
		updatedAt,
		vendorId,
	} = order;

	var prices = [];
	Object.entries(foodItems).map(function ([item, quantity]) {
		for (const menuItem in menu) {
			if (menuItem['name'] == item) {
				prices.push(menuItem['price']);
			}
		}
	}

	console.log(prices);

	console.log(Object.entries(menu));
	// render
	return (
		<Container>
			<Status>Preparing your order...</Status>
			<Division>
				<div>
					{Object.entries(foodItems).map(function ([item, quantity]) {
						return (
							<OrderList>
								<OrderItem>
									{quantity} x {item}
								</OrderItem>
							</OrderList>
						);
					})}
				</div>
				<div>
					{prices.map(function (price) {
						return (
							<OrderList>
								<OrderItem>
									$ {price}
								</OrderItem>
							</OrderList>
						);
					})}
				</div>
			</Division>
			<BreakLine />
			<DivisionBottom>
				<div>
					<DiscountMessage>
						20% discount applies if the order<br></br>takes more than 15 mins
					</DiscountMessage>
				</div>
				<div>
					<Total>Total</Total>
					<TotalPrice>${totalCost}</TotalPrice>
				</div>
			</DivisionBottom>
			<Logo alt="machine-logo" src={coffeeMachine} />
			<Interval />
			<MyButton>Change order</MyButton>
			<MyButton>Cancel order</MyButton>
		</Container>
	);
}

export default Order;
