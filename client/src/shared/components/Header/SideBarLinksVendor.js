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
import ListAltIcon from "@material-ui/icons/ListAlt";
import CheckIcon from "@material-ui/icons/Check";
import StarsIcon from "@material-ui/icons/Stars";
import HelpIcon from "@material-ui/icons/Help";
import CallIcon from "@material-ui/icons/Call";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";

// This is the side bar that pops up when hamburger icon is clicked, it is used material UI's design
export default function SideBarLinks() {
  // used to redirect to certain pages
  const history = useHistory();
  // context to check if they are authenticated
  const auth = useContext(AuthContext);
  // used to detect tablet size, device containss min-width values
  const tabletSize = useMediaQuery(device.tablet);

  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          key={"Vendor_home"}
          onClick={() => {
            history.push("/vendor");
          }}
        >
          <ListItemIcon>
            <RestaurantMenuIcon />
          </ListItemIcon>
          <ListItemText primary={"Vendor Home"} />
        </ListItem>
        <ListItem
          button
          key={"vans"}
          onClick={() => {
            history.push("/vendor/address");
          }}
        >
          <ListItemIcon>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText primary={"Vans (Work In Progress)"} />
        </ListItem>
      </List>
      <List>
        <Divider />
        {/* {auth.isLoggedIn && (
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
        )} */}
        {/* Each list item will have Router's history Hook and rediret to page when a div is clicked.
        Some lists will check if the screen size is smaller than a certain device size (tablet size) and display the item
        Some will check whether it is authenticated and screen size is small*/}
        {auth.isLoggedIn && (
          <ListItem
            button
            key={"Location"}
            onClick={() => {
              history.push("/vendor/orderHistory");
            }}
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Location"} />
          </ListItem>
        )}
        {auth.isLoggedIn && (
          <ListItem
            button
            key={"Orders"}
            onClick={() => {
              history.push("/vendor/pickup");
            }}
          >
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItem>
        )}
        {auth.isLoggedIn && (
          <ListItem
            button
            key={"History"}
            onClick={() => {
              history.push("/vendor/rate");
            }}
          >
            <ListItemIcon>
              <StarsIcon />
            </ListItemIcon>
            <ListItemText primary={"History"} />
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
              history.push("/vendor/profile");
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
