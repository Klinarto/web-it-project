import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../auth-context";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { device } from "../device";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CheckIcon from "@material-ui/icons/Check";
import StarsIcon from "@material-ui/icons/Stars";
import HelpIcon from "@material-ui/icons/Help";
import CallIcon from "@material-ui/icons/Call";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function SideBarLinks() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const tabletSize = useMediaQuery(device.tablet);

  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          key={"vans"}
          onClick={() => {
            history.push("/customer/vans");
          }}
        >
          <ListItemIcon>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText primary={"Vans"} />
        </ListItem>
        <ListItem
          button
          key={"menu"}
          onClick={() => {
            history.push("/customer/menu");
          }}
        >
          <ListItemIcon>
            <RestaurantMenuIcon />
          </ListItemIcon>
          <ListItemText primary={"Menu"} />
        </ListItem>
        {auth.isLoggedIn && (
          <ListItem
            button
            key={"order"}
            onClick={() => {
              history.push("/customer/order");
            }}
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Order"} />
          </ListItem>
        )}
        {auth.isLoggedIn && (
          <ListItem
            button
            key={"orderHistory"}
            onClick={() => {
              history.push("/customer/orderHistory");
            }}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={"Order History"} />
          </ListItem>
        )}
        {auth.isLoggedIn && (
          <ListItem
            button
            key={"pickup"}
            onClick={() => {
              history.push("/customer/pickup");
            }}
          >
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary={"Pickup"} />
          </ListItem>
        )}
        {auth.isLoggedIn && (
          <ListItem
            button
            key={"rate"}
            onClick={() => {
              history.push("/customer/rate");
            }}
          >
            <ListItemIcon>
              <StarsIcon />
            </ListItemIcon>
            <ListItemText primary={"Rate"} />
          </ListItem>
        )}
        <Divider />
        {!tabletSize && (
          <ListItem
            button
            key={"help"}
            onClick={() => {
              history.push("/help");
            }}
          >
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary={"Help"} />
          </ListItem>
        )}
        {!tabletSize && (
          <ListItem
            button
            key={"contactus"}
            onClick={() => {
              history.push("/contactus");
            }}
          >
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            <ListItemText primary={"Contact Us"} />
          </ListItem>
        )}
        {!tabletSize && (
          <ListItem
            button
            key={"myprofile"}
            onClick={() => {
              history.push("/customer/myprofile");
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"My Profile"} />
          </ListItem>
        )}
      </List>
    </>
  );
}
