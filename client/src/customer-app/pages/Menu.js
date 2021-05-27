import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../shared/auth-context";
import {
  DIV,
  ROW,
  Wrapper,
  // MyButton,
  LeftWrapper,
  RightWrapper,
  Title,
} from "./Menu.style";
import Link from "react-router-dom/Link";
import axios from "axios";
import { Fab } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuItem from "../components/MenuItem";

export default function Menu() {
  let orderList = null;
  let orderPrice = {};

  if (localStorage.getItem("order")) {
    orderList = JSON.parse(localStorage.getItem("order"));
  }

  const [menu, setMenu] = useState(null);
  const [order, setOrder] = useState(orderList);

  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    backgroundColor: "#aad9cd",
    color: "white",
    height: "20",
    width: "20",
    zIndex: 2,
  };
  const auth = useContext(AuthContext);

  // Render reach menu item.
  function renderLaptopMenu(array) {
    if (array) {
      const row = array.map((item, key) => {
        let quantity = 0;
        if (order) {
          if (Object.keys(order).includes(item.name)) {
            quantity = order[item.name];
          }
        }

        return (
          <MenuItem
            key={key}
            item={item}
            setOrder={setOrder}
            quantity={quantity}
          />
        );
      });
      return row;
    }
  }

  // This chunk of code related to modal might be used for later implementation.

  // Sets up the modal for cart
  // const useStyles = makeStyles((theme) => ({
  // 	modal: {
  // 		display: 'flex',
  // 		alignItems: 'center',
  // 		justifyContent: 'center',
  // 	},
  // 	paper: {
  // 		backgroundColor: theme.palette.background.paper,
  // 		border: '2px solid #000',
  // 		boxShadow: theme.shadows[5],
  // 		padding: theme.spacing(2, 4, 3),
  // 	},
  // 	}));
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => {finalOrder(order); setOpen(true)};
  // const handleClose = () => {setOpen(false)};

  // Fetch the menu data from the DB and categorise into beverage and food.
  useEffect(() => {
    let isMounted = true;
    const fetchMenu = async () => {
      try {
        const res = await axios.get("/menu");
        if (isMounted) {
          let sorted = {};
          res.data.forEach((menuItem) => {
            if (menuItem.type in sorted) {
              sorted[menuItem.type].push(menuItem);
            } else {
              sorted[menuItem.type] = [menuItem];
            }
          });

          setMenu(sorted);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenu();
    return () => {
      isMounted = false;
    };
  }, [menu]);

  // Take the current state of order when go to cart button is clicked.
  const finalOrder = (order) => {
    console.log("Final Order");
    orderList = {};
    for (const [key, value] of Object.entries(order)) {
      if (value > 0) {
        orderList[key] = value;
        const allMenu = menu["beverage"].concat(menu["food"]);
        allMenu.forEach(function (item) {
          if (item["name"] === key) {
            orderPrice[key] = parseFloat(item["price"]) * parseInt(value);
          }
        });
      }
    }
    console.log(orderList);
    localStorage.setItem("price", JSON.stringify(orderPrice));
    localStorage.setItem("order", JSON.stringify(orderList));
  };

  const displayCart = () => {
    if (order) {
      const numItem = Object.values(order).reduce((a, b) => a + b, 0);
      if (numItem > 0) {
        return (
          <Fab
            variant="extended"
            style={style}
            onClick={() => {
              finalOrder(order);
            }}
          >
            <ShoppingCartIcon /> Cart
          </Fab>
        );
      }
    }
    return null;
  };

  useEffect(() => {
    console.log(order);
    return () => {};
  }, [order]);
  return (
    <Wrapper>
      <DIV>
        <LeftWrapper>
          <Title>Menu</Title>
        </LeftWrapper>
        <RightWrapper>
          <Link to={auth.isLoggedIn ? "/customer/cart" : "/customer/login"}>
            {displayCart()}
            {/* <MyButton
							aria-label="Go to cart"
							onClick={() => {
								finalOrder(order);
							}}
						>
							<ShoppingCartIcon />
						</MyButton> */}
          </Link>
          {/* <MyButton 
						aria-label="Go to cart" 
						onClick={event =>  window.location.href='./cart'}
							//handleOpen
						>
						<ShoppingCartIcon/>
					</MyButton> */}
          {/* <Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={useStyles().modal}
						open={open}
						onClose={handleClose}
						closeAfterTransition
					>
						<Fade in={open}>
						<div className={useStyles().paper}>
							<h2 id="transition-modal-title">Transition modal</h2>
							<p id="transition-modal-description"></p>
							<button onClick={() => makeOrder(orderList)}>send</button>
						</div>
						</Fade>
					</Modal> */}
        </RightWrapper>
      </DIV>
      <h2>Beverage</h2>
      <hr />
      <br />
      <ROW>{menu ? renderLaptopMenu(menu["beverage"]) : <h1>Loading</h1>}</ROW>

      <h2>Food</h2>
      <hr />
      <br />

      <ROW>{menu ? renderLaptopMenu(menu["food"]) : <h1>Loading</h1>}</ROW>
    </Wrapper>
  );
}
