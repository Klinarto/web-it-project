import React from "react";
import { HeaderWrapper, LogoText, ItemList, MyNavLink } from "./Header.styles";

export function Header() {
  return (
    <HeaderWrapper>
      <LogoText>Snacks in a Van</LogoText>
      <ItemList>
        <li>
          <MyNavLink to="/customer/vans">Vans</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/customer/orders">Orders</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/customer/help">Help</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/customer/contactus">Contact Us</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/customer/myaccount">My Accout</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/customer/signout">Sign out</MyNavLink>
        </li>
      </ItemList>
    </HeaderWrapper>
  );
}

export default Header;
