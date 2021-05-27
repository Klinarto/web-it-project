import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  OrderTitle,
  InnerDiv,
  ButtonDiv,
  InnerDivBot,
  InnerDivButtons,
  DeclineMessage,
  OrderList,
  FoodItem,
  Division,
  OrderItem,
} from "../pages/VendorOrderList.style";
import { Link } from "react-router-dom";
import { parseDate } from "../../customer-app/utilities/Utils";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

export default function LinkToOrder(props) {
  const { orderId, customerId, foodItems, status, totalCost, createdAt } =
    props.order;

  //update status to the database.
  const updateStatus = async (updatedStatus) => {
    try {
      console.log(JSON.parse(updatedStatus));
      const res = await axios.put(
        `/order/${orderId}`,
        JSON.parse(updatedStatus)
      );
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
    return;
  };

  function checkStatus(check) {
    if (status == "declined") {
      return true;
    }
    if (status == "fulfilled") {
      return true;
    }
    if (status == "pending") {
      return false;
    }
    if (status == "recieved") {
      if (status == check) {
        return true;
      }
    }
    if (status == "ready") {
      if (status == check) {
        return true;
      }
      if (check == "recieved") {
        return true;
      }
    }
    return false;
  }

  const [recieveDisabled, setRecieveDisabled] = useState(
    checkStatus("recieved")
  );
  const [declineDisabled, setDeclineDisabled] = useState(
    checkStatus("declined")
  );
  const [readyDisabled, setReadyDisabled] = useState(checkStatus("ready"));
  const [completeDisabled, setCompleteDisabled] = useState(
    checkStatus("fulfilled")
  );

  const parsedDate = parseDate(new Date(createdAt));

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#aad9cd",
      },
      action: {
        disabledBackground: "white",
      },
    },
  });

  return (
    <Container>
      <div>
        <Link
          to={{ pathname: `/vendor/orderdetails/${orderId}` }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <OrderTitle>Order {orderId} </OrderTitle>
        </Link>
        <DeclineMessage>
          <b> {declineDisabled ? "ORDER DECLINED" : ""}</b>{" "}
        </DeclineMessage>
        <Division>
          <InnerDiv>
            <InnerDivBot>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={declineDisabled}
                  onClick={() => {
                    setDeclineDisabled(true);
                    setCompleteDisabled(true);
                    setReadyDisabled(true);
                    setRecieveDisabled(true);
                    updateStatus('{"status":"declined"}');
                  }}
                >
                  Decline
                </Button>
              </ThemeProvider>
            </InnerDivBot>
          </InnerDiv>

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

          <InnerDiv>
            <InnerDivButtons>
              <ButtonDiv>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={recieveDisabled}
                    onClick={() => {
                      setRecieveDisabled(true);
                      updateStatus('{"status":"recieved"}');
                    }}
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
                    disabled={readyDisabled}
                    onClick={() => {
                      setReadyDisabled(true);
                      setRecieveDisabled(true);
                      updateStatus('{"status":"ready"}');
                    }}
                  >
                    Ready
                  </Button>
                </ThemeProvider>
              </ButtonDiv>

              <ButtonDiv>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={completeDisabled}
                    onClick={() => {
                      setCompleteDisabled(true);
                      setReadyDisabled(true);
                      setRecieveDisabled(true);
                      updateStatus('{"status":"fulfilled"}');
                    }}
                  >
                    Complete
                  </Button>
                </ThemeProvider>
              </ButtonDiv>
            </InnerDivButtons>
          </InnerDiv>
        </Division>

        <hr />
      </div>
    </Container>
  );
}
