import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import {
  HeaderWrapper,
  LogoText,
  ItemList,
  MyNavLink,
  MyButton,
} from "./Header.styles";

export function Header() {
  return (
    <StylesProvider injectFirst>
      <HeaderWrapper>
        <MyButton>asdfasdfasdfasdf</MyButton>
        <LogoText>Snacks in a Van</LogoText>
        <ItemList>
          <li>
            <MyNavLink to="/customer/vans">Vans</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/customer/orders">Orders</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/help">Help</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/contactus">Contact Us</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/customer/myaccount">My Accout</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/customer/signout">Sign out</MyNavLink>
          </li>
        </ItemList>
      </HeaderWrapper>
    </StylesProvider>
  );
}

export default Header;
