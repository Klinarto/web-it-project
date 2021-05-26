import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Container,
	OrderTitle,
	InnerDiv,
	InnerDivBot,
	OrderList,
	FoodItem,
	Division,
	OrderItem,
} from "../pages/VendorOrderList.style";
import { Link } from "react-router-dom";
import { parseDate } from "../../customer-app/utilities/Utils";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';


export default function LinkToOrder(props) {
	const {
		orderId,
		customerId,
		foodItems,
		status,
		totalCost,
		createdAt,
	} = props.order;

	  //update status to the database.
	  const updateStatus = async (status) => {
		try {
		  console.log(status);
		  console.log(JSON.parse(status))		  
		  
		//   const userData = JSON.parse(localStorage.getItem("userData"));
		//   console.log(userData);
		//   const data = { vendorId: "60939f9aa6762b64b82547b3" };
	
		//   if (!objectIsEmpty(order)) {
		// 	data["foodItems"] = order;
		//   }
		  
		  const res = await axios.put(`/order/${orderId}`, JSON.parse(status))
		  console.log(res);
		} catch (error) {
		  console.log(error.response.data);
		}
		return;
	  };
	
	const [recieveDisabled, setRecieveDisabled] = useState(false);
	const [declineDisabled, setDeclineDisabled] = useState(false);
	const [readyDisabled, setReadyDisabled] = useState(false);
	const [completeDisabled, setCompleteDisabled] = useState(false);


	const parsedDate = parseDate(new Date(createdAt));

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#aad9cd',
			},
		  action: {
			disabledBackground: "white",
		  }
		}
	  });

	return (
		<Container>
				<div>
				<Link
					to={{ pathname: `/vendor/orderdetails/${orderId}`, state: props.order }}
					style={{ textDecoration: "none", color: "black"  }}
					>
						<OrderTitle>Order {orderId} </OrderTitle>
				</Link>
				<Division>
					<InnerDiv>
					<InnerDivBot>
						<ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color = "secondary"
						disabled = {declineDisabled}
						onClick={() => setDeclineDisabled(true)}
						>
						Decline
						</Button>
						</ThemeProvider>
					</InnerDivBot></InnerDiv>
					
					<InnerDiv>
						<OrderList>
							<OrderItem>
								<b>Customer:</b> {customerId.email}
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

					</InnerDiv>
					
					<InnerDiv style >
						
						<ul key ="Recieve">
						<ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color="primary"
						disabled = {recieveDisabled}
						onClick={() => setRecieveDisabled(true)}
						>
						Recieved
						</Button>
						</ThemeProvider>
						</ul>
						
						<ul key = "Ready">
						<ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color="primary"
						disabled = {readyDisabled}
						onClick={() => setReadyDisabled(true)}
						>
						Ready
						</Button>
						</ThemeProvider>
						</ul>

						<ul key = "Complete">
						<ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color = "primary"
						disabled = {completeDisabled}

						onClick={() => {setCompleteDisabled(true); updateStatus('{"status":"fulfilled"}')}}
						>
						Complete
						</Button>
						</ThemeProvider>
						</ul>


					</InnerDiv>
				</Division>
				<hr />
				</div>
		</Container>
	);
}
