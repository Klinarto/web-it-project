import React, { useEffect, useState } from "react";
import {
  DIV,
  ROW,
  Wrapper,
  MyButton,
  LeftWrapper,
  RightWrapper,
  Title,
} from "./Menu.style";
import Link from "react-router-dom/Link";
import axios from "axios";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuItem from "../components/MenuItem";

export default function Menu() {
  var orderList = {};
  var orderPrice = {};
  const [menu, setMenu] = useState({});
  const [order, setOrder] = useState({});

  // Render reach menu item.
  function renderLaptopMenu(array) {
    try {
      const row = array.map((item) => (
        <MenuItem item={item} setOrder={setOrder} />
      ));
      return row;
    } catch (error) {
      console.log(error);
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

  // Update order when the quantity changes by + - buttons.
  useEffect(() => {
    return () => {};
  }, [order]);

  // Take the current state of order when go to cart button is clicked.
  const finalOrder = (order) => {
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
    localStorage.setItem("price", JSON.stringify(orderPrice));
    localStorage.setItem("order", JSON.stringify(orderList));
  };

  return (
    <Wrapper>
      <DIV>
        <LeftWrapper>
          <Title>Menu</Title>
        </LeftWrapper>
        <RightWrapper>
          <Link to="/customer/cart">
            <MyButton
              aria-label="Go to cart"
              onClick={() => {
                finalOrder(order);
              }}
            >
              <ShoppingCartIcon />
            </MyButton>
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
      <ROW>{renderLaptopMenu(menu["beverage"])}</ROW>

      <h2>Food</h2>
      <hr />
      <br />

      <ROW>{renderLaptopMenu(menu["food"])}</ROW>
    </Wrapper>
  );
}
