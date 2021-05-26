
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
  OrderList,
  OrderItem,
  BreakLine,
  DivisionBottom,
  DiscountMessage,
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
  const { foodItems,orderId,totalCost } = order;

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
      <Status>Order {orderId} - detail</Status>
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
                <OrderItem>$ {price}</OrderItem>
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

      <Interval />
      {/* <MyButton>Change order</MyButton>
      <MyButton>Cancel order</MyButton> */}

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

    </Container>
  );
}

export default VendorOrderDetails;
