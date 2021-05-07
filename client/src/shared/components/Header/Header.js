import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import { useHistory } from "react-router-dom";

import { ItemList, MyNavLink } from "./Header.styles";
import { AuthContext } from "../../auth-context";

import Drawer from "@material-ui/core/Drawer";

import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// react.school/material-ui
const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: grey[50],
  },
  title: {
    flexGrow: 1,
    color: grey[50],
  },
  customColor: {
    backgroundColor: grey[900],
  },
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  offset: theme.mixins.toolbar,
}));

export default function Header() {
  const history = useHistory();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log(open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function sideBarLinks() {
    return (
      <>
        <Divider />
        <List>
          {["vans", "menu", "order", "orderhistory", "pickup", "rate"].map(
            (text) => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  history.push("/customer/" + text);
                }}
              >
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </>
    );
  }

  function sideLinks() {
    return (
      <ItemList>
        <li>
          <MyNavLink to="/customer/vans">Vans</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/customer/menu">Menu</MyNavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/order">Order</MyNavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/orderhistory">History</MyNavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/pickup">Pick Up</MyNavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/rate">Rate</MyNavLink>
          </li>
        )}
        <li>
          <MyNavLink to="/help">Help</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/contactus">Contact Us</MyNavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/myaccount">My Account</MyNavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer">
              <Button
                variant="contained"
                color="secondary"
                onClick={auth.logout}
              >
                LOGOUT
              </Button>
            </MyNavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <MyNavLink to="/customer/login">
              <Button variant="contained" color="secondary">
                LOGIN
              </Button>
            </MyNavLink>
          </li>
        )}
      </ItemList>
    );
  }

  return (
    <React.Fragment>
      <AppBar
        position="relative"
        color={"customColor"}
        className={classes.customColor}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Snacks in a Van
          </Typography>
          {sideLinks()}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {classes.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        {sideBarLinks()}
      </Drawer>
    </React.Fragment>
  );
}
