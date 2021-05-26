
import Button from "@material-ui/core/Button";
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Interval from "../components/Interval";
import {
  InnerDivButtons,
  ButtonDiv,
  DeclineMessage,
}from "./VendorOrderList.style"
import {
  Container,
  H2,
  H3,
  Customer,
  Division,
  DivisionTop,
  OrderList,
  OrderItem,
  BreakLine,
  DivisionBottom,
  DivisionBack,
  Total,
  TotalPrice,
} from "./VendorOrderDetail.style";
import axios from "axios";
import { useLocation } from "react-router";

export function VendorOrderDetails(props) {
  const history = useHistory();
  const order = useLocation().state;
  console.log(order);


  	//update status to the database.
	const updateStatus = async (updatedStatus) => {
    try {
      console.log(JSON.parse(updatedStatus))		    
      const res = await axios.put(`/order/${orderId}`, JSON.parse(updatedStatus))
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
    return;
    };
  
  const { customerId, status, foodItems,orderId,totalCost } = order;

    function checkStatus(check){
		if (status == "declined"){return true;}
		if (status == "fulfilled"){return true;}
		if( status == "pending"){return false;}
		if( status == "recieved" ){
			if(status == check){return true;}
		}
		if( status == "ready" ){
			if(status == check){return true ;}
			if(check =="recieved"){return true;}		
		}
		return false;
	}
	
	const [recieveDisabled, setRecieveDisabled] = useState(checkStatus("recieved"));
	const [declineDisabled, setDeclineDisabled] = useState(checkStatus("declined"));
	const [readyDisabled, setReadyDisabled] = useState(checkStatus("ready"));
	const [completeDisabled, setCompleteDisabled] = useState(checkStatus("fulfilled"));

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

  const customerFName = customerId.firstName.charAt(0).toUpperCase()+customerId.firstName.slice(1);
  const customerLName = customerId.lastName.charAt(0).toUpperCase()+customerId.lastName.slice(1);

  return (
    <Container>
      <br></br>
      <DivisionTop>
      <div>
      <H2>Order Number #{orderId} </H2>
      <Customer><b>Customer Name :</b>{customerFName} {customerLName} </Customer>
      <Customer><b>Customer Email :</b> {customerId.email}</Customer>
      </div>
      <div>
      <H3>Time remaining </H3>
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
                  {quantity}  &nbsp;  {item}
                </OrderItem>
              </OrderList>
            );
          })}
        </div>

      </Division>
      <BreakLine />
      <DivisionBottom>
        <div>
        <InnerDivButtons>
						
						<ButtonDiv>
						<ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color="primary"
						disabled = {recieveDisabled}
						onClick={() => {setRecieveDisabled(true); updateStatus('{"status":"recieved"}')}}
						>
						Recieved
						</Button>
						</ThemeProvider>
						</ButtonDiv>
						
						<ButtonDiv>
						<ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color="primary"
						disabled = {readyDisabled}
						onClick={() => {setReadyDisabled(true);
              setRecieveDisabled(true);
              updateStatus('{"status":"ready"}')}}
						>
						Ready
						</Button>
						</ThemeProvider>
						</ButtonDiv>

						<ButtonDiv>
						<ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color = "primary"
						disabled = {completeDisabled}

						onClick={() => {setCompleteDisabled(true);
							setReadyDisabled(true);
							setRecieveDisabled(true); 
              updateStatus('{"status":"fulfilled"}')}}
						>
						Complete
						</Button>
						</ThemeProvider>
						</ButtonDiv>

					</InnerDivButtons>
          
        </div>
        <div>
          <Total>Total</Total>
          <TotalPrice>${totalCost}</TotalPrice>

          <ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color = "secondary"
						disabled = {declineDisabled}
						onClick={() => {setCompleteDisabled(true);
							setReadyDisabled(true);
							setRecieveDisabled(true);
              setDeclineDisabled(true); updateStatus('{"status":"declined"}')}}
						>
						Decline
						</Button>
            <DeclineMessage><b> {declineDisabled ? 'ORDER DECLINED' : ''}</b> </DeclineMessage>
					</ThemeProvider>
          
        </div>
      </DivisionBottom>

      <DivisionBack>
      
      <ThemeProvider theme={theme}>
						<Button
						variant="contained"
						color = "primary"
						onClick={() => {history.push('/vendor/orderlist/')}} 
						>
						Back
						</Button>
				</ThemeProvider>
        
      </DivisionBack>
      
    </Container>
  );
}

export default VendorOrderDetails;
