import React from "react";
import Interval from "../components/Interval";
import coffeeMachine from "../../coffeeMachine.png";
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
  DiscountMessage,
  Total,
  TotalPrice,
  Logo,
  MyButton
} from "./Order.style";

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
  },
  {
    id:'5',
    quantity: '3',
    name:'Fancy biscuit',
    price: '$12.00'
  },
  {
    id:'6',
    quantity: '3',
    name:'Fancy biscuit',
    price: '$12.00'
  },
  {
    id:'7',
    quantity: '3',
    name:'Fancy biscuit',
    price: '$12.00'
  }
];

var totalPrice = 0;
for (var i = 0; i < props.length; i++) {
  totalPrice += parseFloat(props[i].price.slice(1));
}

export function Order() {
  return (
    <Container>
        <Status>Preparing your order...</Status>
        <Division>
          <LeftWrapper>
            {props.map(function(item) {
              return <OrderList key = {item.id}>
                <OrderItem>{item.quantity} x {item.name}</OrderItem>
              </OrderList>
            })}
          </LeftWrapper>
          <RightWrapper>
          {props.map(function(item) {
            return <OrderList key = {item.id}>
              <OrderPrice>{item.price}</OrderPrice>
            </OrderList>
          })}
          </RightWrapper>
        </Division>
        <BreakLine/>
        <DivisionBottom>
          <LeftWrapper>
            <DiscountMessage>20% discount applies if the order<br></br>takes more than 15 mins</DiscountMessage>
          </LeftWrapper>
          <RightWrapper>
            <Total>Total</Total>
            <TotalPrice>${totalPrice+"0"}</TotalPrice>
          </RightWrapper>
        </DivisionBottom>
        <Logo alt = "machine-logo" src = {coffeeMachine} />
        <Interval/>
        <MyButton>Change order</MyButton>
        <MyButton>Cancel order</MyButton>
    </Container>
  )
}

export default Order;
