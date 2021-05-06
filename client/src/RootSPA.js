import React, { useCallback, useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import Header from "./shared/components/Header/Header";
import Login from "./customer-app/pages/Login";
import Vans from "./customer-app/pages/Vans";
import Menu from "./customer-app/pages/Menu";
import OrderHistory from "./customer-app/pages/OrderHistory";
import Order from "./customer-app/pages/Order";
import Pickup from "./customer-app/pages/Pickup";
import Rate from "./customer-app/pages/Rate";
import Welcome from "./customer-app/pages/welcome";
import Register from "./customer-app/pages/Register";
import Help from "./customer-app/pages/Help";
import Contactus from "./customer-app/pages/Contactus";
import Cart from "./customer-app/pages/Cart";
import axios from "axios";

import { AuthContext } from "./shared/auth-context";

axios.defaults.baseURL = "http://localhost:5000";

export function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [token, setToken] = useState(true);

	const login = useCallback((token) => {
		setToken(token);
		console.log(token + "asdfasdfasdfasdf");
		setIsLoggedIn(true);
		localStorage.setItem("userData", JSON.stringify({ token: token }));
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setIsLoggedIn(false);
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("userData"));
		if (storedData && storedData.token) {
			login(storedData.token);
		}
	}, []);

	let customerRoutes;
	if (token) {
		customerRoutes = (
			<Switch>
				<Route path="/customer" exact>
					<Welcome />
				</Route>
				<Route path="/customer/orderhistory">
					<OrderHistory />
				</Route>
				<Route path="/customer/vans">
					<Vans />
				</Route>
				<Route path="/customer/menu">
					<Menu />
				</Route>
				<Route path="/customer/pickup">
					<Pickup />
				</Route>
				<Route path="/customer/order">
					<Order />
				</Route>
				<Route path="/customer/rate">
					<Rate />
				</Route>
				<Route path="/help">
					<Help />
				</Route>
				<Route path="/contactus">
					<Contactus />
				</Route>
				<Route path="/customer/cart">
					<Cart />
				</Route>
				<Route>{<div>Error 404</div>}</Route>
			</Switch>
		);
	} else {
		customerRoutes = (
			<Switch>
				<Route path="/customer" exact>
					<Welcome />
				</Route>
				<Route path="/customer/vans">
					<Vans />
				</Route>
				<Route path="/customer/menu">
					<Menu />
				</Route>
				<Route path="/help">
					<Help />
				</Route>
				<Route path="/contactus">
					<Contactus />
				</Route>
				<Route path="/customer/login">
					<Login />
				</Route>
				<Route path="/customer/register">
					<Register />
				</Route>
				<Route path="/customer/cart">
					<Cart />
				</Route>
				<Route>{<div>Error 404</div>}</Route>
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<Header />
				{customerRoutes}
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
