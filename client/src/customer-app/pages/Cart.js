import axios from "axios";
import { useHistory } from "react-router-dom";
import {
	Container,
	Status,
	OrderList,
	OrderItem,
	LeftWrapper,
	RightWrapper,
	Division,
	BreakLine,
	DivisionBottom,
	Logo,
	Total,
	TotalPrice,
	DiscountMessage,
	MyButton,
} from "./Cart.style";
import coffeeMachine from "../../coffeeMachine.png";
import { objectIsEmpty } from "../utilities/Utils";

export default function Cart() {
	const history = useHistory();

	// Fetch the order details from the local storage.
	// This will be replaced with cookie in later version of implementation.
	const orderList = JSON.parse(localStorage.getItem("order"));
	const orderPrice = JSON.parse(localStorage.getItem("price"));

	// Organise the order details and send to the database.
	const makeOrder = async (order) => {
		try {
			console.log(order);
			const userData = JSON.parse(localStorage.getItem("userData"));
			console.log(userData);
			const data = { vendorId: "60939f9aa6762b64b82547b3" };

			if (!objectIsEmpty(order)) {
				data["foodItems"] = order;
			}
			const res = await axios.post("/order", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(res);
		} catch (error) {
			console.log(error.response.data);
		}
		return;
	};

	var totalPrice = 0;
	Object.entries(orderPrice).map((item) => {
		totalPrice += parseFloat(item[1]);
	});

	console.log(Object.entries(orderList));

	// Render
	return (
		<Container>
			<Status>Confirm your order</Status>
			<Division>
				<LeftWrapper>
					{Object.entries(orderList).map(function (item) {
						return (
							<OrderList>
								<OrderItem>
									{item[1]} x {item[0]}
								</OrderItem>
							</OrderList>
						);
					})}
				</LeftWrapper>
				<RightWrapper>
					{Object.entries(orderPrice).map(function (item) {
						return (
							<OrderList>
								<OrderItem>$ {item[1]}</OrderItem>
							</OrderList>
						);
					})}
				</RightWrapper>
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
					<TotalPrice>${totalPrice}</TotalPrice>
				</div>
			</DivisionBottom>
			<Logo alt="machine-logo" src={coffeeMachine} />
			<MyButton
				onClick={() => {
					makeOrder(orderList);
					history.push("/customer/order");
				}}
			>
				make order
			</MyButton>
		</Container>
	);
}
