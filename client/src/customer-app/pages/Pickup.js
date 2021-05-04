import React from "react";
import coffeeCup from "../../coffeeCup.png";
import {
  Container,
  Status,
  Centerwrapper,
  OrderList,
  OrderItem,
  OrderPrice,
  BreakLine,
  DiscountMessage,
  Logo,
  MyButton
} from "./Pickup.style";

const props = [
  {
    id:'1',
    quantity: '1',
    name:'Latte',
    price: '$4.50'
  },
  {
    id:'2',
    quantity: '2',
    name:'Cappuccino',
    price: '$9.00'
  },
  {
    id:'3',
    quantity: '1',
    name:'Small cake',
    price: '$9.00'
  },
  {
    id:'4',
    quantity: '3',
    name:'Fancy biscuit',
    price: '$12.00'
  }
];


export function Pickup() {
  return (
    <Container>
      <Centerwrapper>
        <Status>Your order is ready to pick up</Status>
        {props.map(function(item) {
          return <OrderList key = {item.id}>
            <OrderItem>{item.quantity}</OrderItem>
            <OrderItem>{item.name}</OrderItem>
            <OrderPrice>{item.price}</OrderPrice>
          </OrderList>
        })}
        <BreakLine></BreakLine>
        <Logo alt = "coffee-logo" src = {coffeeCup} />
        <MyButton>Rate your experience</MyButton>
      </Centerwrapper>
    </Container>
  )}





export default Pickup;
