import React, { useContext } from "react";
import { AuthContext } from "../../auth-context";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { StylesProvider } from "@material-ui/core/styles";
import { HeaderWrapper, LogoText, ItemList, MyNavLink } from "./Header.styles";
import { device } from "../device";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export function Header() {
  const auth = useContext(AuthContext);

  const tabletSize = useMediaQuery(device.tablet);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log(open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function sideLinks() {
    return (
      <ItemList>
        <li>
          <MyNavLink to="/customer/vans">Vans</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/customer/order">Order</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/customer/orderhistory">History</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/help">Help</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/contactus">Contact Us</MyNavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/menu">Menu</MyNavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/rate">Rate</MyNavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/pickup">Pick Up</MyNavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/myaccount">My Account</MyNavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer">
              <button onClick={auth.logout}>LOGOUT</button>
            </MyNavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/login">
              <button>LOGIN</button>
            </MyNavLink>
          </li>
        )}
      </ItemList>
    );
  }

  function sideButton() {
    return (
      <IconButton
        color="primary"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
    );
  }

  return (
    <StylesProvider injectFirst>
      <HeaderWrapper>
        <LogoText>Snacks in a Van</LogoText>

        {tabletSize ? sideLinks() : sideButton()}
      </HeaderWrapper>
    </StylesProvider>
  );
}

export default Header;
