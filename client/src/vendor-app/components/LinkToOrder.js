import React from "react";
import {
	Container,
	OrderTitle,
	OrderList,
	FoodItem,
	Division,
	OrderItem,
} from "../pages/VendorOrderList.style";
import { Link } from "react-router-dom";
import { parseDate } from "../../customer-app/utilities/Utils";
import Button from "@material-ui/core/Button";

export default function LinkToOrder(props) {
	const {
		orderId,
		customerId,
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
									<b>Customer:</b> {customerId.email}
								</OrderItem>
								<OrderItem>
									<b>Status:</b> {status}
								</OrderItem>
								<OrderItem>
								<b>Items ordered: </b>
								</OrderItem>
								{Object.keys(foodItems).map((key, i) => (
									<FoodItem>
										{foodItems[key]} {key}
									</FoodItem>
								))}
								<OrderItem>
								<b>Created at:</b> {parsedDate}
								</OrderItem>
							</OrderList>
						</innerDiv>
						
						<innerDiv>
							<Button
							variant="contained"
							color="primary"
							width = "60%"
							style={{
								backgroundColor: "black",
								// padding: "16px 0",
							}}
							onClick={() => {
								// sendData();
							}}
						    >
							Made
							</Button>

						</innerDiv>

						<innerDiv>
							<Button
							variant="contained"
							color="primary"
							style={{
								backgroundColor: "#aad9cd",
								// padding: "16px 0",
							}}
							onClick={() => {
								// sendData();
							}}
						    >
							Picked Up
							</Button>


						</innerDiv>


						<br />
					</Division>
					<hr />
				</div>
			</Link>
		</Container>
	);
}
