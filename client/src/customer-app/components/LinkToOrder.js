import React from "react";
import {
  Container,
  OrderTitle,
  OrderList,
  Division,
  OrderItem,
  Status,
  TopDiv,
} from "../pages/OrderHistory.style";


import { Link } from "react-router-dom";
import { parseDate } from "../../utilities/Utils";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#aad9cd",
		},}
});

export default function LinkToOrder(props) {
  const { orderId, vendorId, foodItems, status, totalCost, createdAt } =
    props.order;

	const parsedDate = parseDate(new Date(createdAt));
	
	function Quantity(foodlist){
		var sum =0;
		for (var food in foodlist){
			sum+=parseFloat(foodlist[food]);
		}
		return sum;
	}

	return (
		<Container>
			<TopDiv>
				<OrderTitle>#{orderId} </OrderTitle>
				<Status>{status.toUpperCase()}</Status>
			</TopDiv>
			<Division>
				<OrderList>
				<OrderItem key = "van"><b>{vendorId.name} </b> </OrderItem>
				<OrderItem key = "q">{Quantity(foodItems)} items &middot; $ {totalCost} </OrderItem>
				<OrderItem key ="date">{parsedDate}</OrderItem>
				</OrderList>
		
				<Link
			to={{ pathname: `/customer/order/${orderId}` }}
			style={{ textDecoration: "none", color: "black" }}
		>

				<ThemeProvider theme={theme}>
					<Button
						variant="contained"
						color="primary"
					>
						Detail
					</Button>
				</ThemeProvider>
				</Link>
          	</Division>
    </Container>
  );
}


					{/* {Object.keys(foodItems).map((name, key) => (
						<FoodItem key={key}>
							{foodItems[name]} {name}
						</FoodItem>
					))} */}