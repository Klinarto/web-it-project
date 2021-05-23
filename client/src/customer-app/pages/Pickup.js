import React from "react";
import coffeeCup from "../../images/coffeeCup.png";
import {
  Container,
  Status,
  Division,
  LeftWrapper,
  RightWrapper,
  OrderList,
  OrderItem,
  OrderPrice,
  BreakLine,
  DivisionBottom,
  Total,
  TotalPrice,
  Logo,
  MyButton,
} from "./Pickup.style";

const props = [
  {
    id: "1",
    quantity: "1",
    name: "Latte",
    price: "$4.50",
  },
  {
    id: "2",
    quantity: "2",
    name: "Cappuccino",
    price: "$9.00",
  },
  {
    id: "3",
    quantity: "1",
    name: "Small cake",
    price: "$9.00",
  },
  {
    id: "4",
    quantity: "3",
    name: "Fancy biscuit",
    price: "$12.00",
  },
];

var totalPrice = 0;
for (var i = 0; i < props.length; i++) {
  totalPrice += parseFloat(props[i].price.slice(1));
}

export function Pickup() {
  return (
    <Container>
      <Status>Your order is ready to pick up</Status>
      <Division>
        <LeftWrapper>
          {props.map(function (item) {
            return (
              <OrderList key={item.id}>
                <OrderItem>
                  {item.quantity} x {item.name}
                </OrderItem>
              </OrderList>
            );
          })}
        </LeftWrapper>
        <RightWrapper>
          {props.map(function (item) {
            return (
              <OrderList key={item.id}>
                <OrderPrice>{item.price}</OrderPrice>
              </OrderList>
            );
          })}
        </RightWrapper>
      </Division>
      <BreakLine />
      <DivisionBottom>
        <LeftWrapper></LeftWrapper>
        <RightWrapper>
          <Total>Total</Total>
          <TotalPrice>${totalPrice + "0"}</TotalPrice>
        </RightWrapper>
      </DivisionBottom>
      <Logo alt="coffee-logo" src={coffeeCup} />
      <MyButton>Rate your experience</MyButton>
    </Container>
  );
}

export default Pickup;
