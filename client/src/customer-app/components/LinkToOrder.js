import React from "react";
import {
	Container,
	OrderTitle,
	OrderList,
	FoodItem,
	Division,
	OrderItem,
} from "../pages/OrderHistory.style";
import { Link } from "react-router-dom";
import { parseDate } from "../utilities/Utils";

export default function LinkToOrder(props) {
	const {
		orderId,
		vendorId,
		foodItems,
		status,
		totalCost,
		createdAt,
	} = props.order;

	const parsedDate = parseDate(new Date(createdAt));

	return (
		<Container>
			<Link
				to={{ pathname: `/customer/order/${orderId}`, state: props.order }}
				style={{ textDecoration: "none", color: "black" }}
			>
				<div>
					<OrderTitle>Order {orderId} </OrderTitle>
					<hr />
					<Division>
						<innerDiv>
							<OrderList>
								<OrderItem>
									<b>Vendor:</b> {vendorId.name}
								</OrderItem>
								<OrderItem>
									<b>Status:</b> {status}
								</OrderItem>
							</OrderList>
						</innerDiv>

						<innerDiv>
							<OrderItem>
								<b>Items ordered: </b>
							</OrderItem>
							{Object.keys(foodItems).map((key, i) => (
								<FoodItem>
									{foodItems[key]} {key}
								</FoodItem>
							))}
						</innerDiv>

						<innerDiv>
							<OrderItem>
								<b>Total Cost:</b> $ {totalCost}
							</OrderItem>
							<OrderItem>
								<b>Created at:</b> {parsedDate}
							</OrderItem>
						</innerDiv>
						<br />
					</Division>
					<hr />
				</div>
			</Link>
		</Container>
	);
}