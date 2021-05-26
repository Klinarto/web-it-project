
import Button from "@material-ui/core/Button";
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Interval from "../components/Interval";

import {
  Container,
  Status,
  Division,
  DivisionTop,
  OrderList,
  OrderItem,
  BreakLine,
  DivisionBottom,
  DivisionBack,
  Total,
  TotalPrice,
  Logo,
  MyButton,
} from "./VendorOrderDetail.style";
import axios from "axios";
import { useLocation } from "react-router";

export function VendorOrderDetails(props) {


  const [menu, setMenu] = useState({});
  const [recieveDisabled, setRecieveDisabled] = useState(false);
	const [declineDisabled, setDeclineDisabled] = useState(false);
	const [readyDisabled, setReadyDisabled] = useState(false);
	const [completeDisabled, setCompleteDisabled] = useState(false);

  const history = useHistory();

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
  const { customerId, foodItems,orderId,totalCost } = order;

  var prices = [];
  // console.log(foodItems);
  // console.log(menu);
  // console.log("menu type", typeof menu);
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
      <br></br>
      <DivisionTop>
      <div>
      <h2>Order Number #{orderId} </h2>
      <h3>Customer Name: {customerId.firstName} </h3>
      </div>
      <div>
      <h3>Time remaining </h3>
      <Interval />
      </div>
      </DivisionTop>
      <BreakLine />
      <Division>
        <div>
          {Object.entries(foodItems).map(function ([item, quantity]) {
            return (
              <OrderList>
                <OrderItem>
                  {quantity}  {item}
                </OrderItem>
              </OrderList>
            );
          })}
        </div>
        <div>
          {prices.map(function (price) {
            return (
              <OrderList>
                <OrderItem>$ {price}</OrderItem>
              </OrderList>
            );
          })}
        </div>
      </Division>
      <BreakLine />
      <DivisionBottom>
        <div>
          
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

						onClick={() => { setCompleteDisabled(true); history.push('/vendor/orderlist/')}} 
            // setCompleteDisabled(true),
						>
						Complete
						</Button>
						</ThemeProvider>
						</ul>
          
        </div>
        <div>
          <Total>Total</Total>
          <TotalPrice>${totalCost}</TotalPrice>

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

        </div>
      </DivisionBottom>

      <DivisionBack>
      <ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color = "primary"

						onClick={() => {history.push('/vendor/orderlist/')}} 
            // setCompleteDisabled(true),
						>
						Back
						</Button>
				</ThemeProvider>
      </DivisionBack>

    </Container>
  );
}

export default VendorOrderDetails;
