import React, { useCallback, useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

import Main from "./shared/pages/Main";

import Header from "./shared/components/Header/Header";
import Footer from "./shared/components/Footer/Footer";
import Error from "./shared/pages/ErrorPage";
import Login from "./shared/pages/Login";
import Register from "./shared/pages/Register";

// import Login from "./customer-app/pages/Login";
import Vans from "./customer-app/pages/Vans";
import Menu from "./customer-app/pages/Menu";
import OrderHistory from "./customer-app/pages/OrderHistory";
import Order from "./customer-app/pages/Order";
import Pickup from "./customer-app/pages/Pickup";
import Rate from "./customer-app/pages/Rate";
import Welcome from "./customer-app/pages/Welcome";
// import Register from "./customer-app/pages/Register";
import Help from "./shared/pages/Help";
import Contactus from "./shared/pages/Contactus";
import Cart from "./customer-app/pages/Cart";
import MyAccount from "./customer-app/pages/MyAccount";

import VendorWelcome from "./vendor-app/pages/VendorWelcome";
// import VendorLogin from "./vendor-app/pages/VendorLogin";
import VendorAddress from "./vendor-app/pages/VendorAddress";
import VendorClose from "./vendor-app/pages/VendorClose";
import VendorOrderList from "./vendor-app/pages/VendorOrderList";
import VendorOrderDetails from "./vendor-app/pages/VendorOrderDetails";
import VendorProfile from "./vendor-app/pages/VendorProfile";

import axios from "axios";

import { AuthContext } from "./shared/auth-context";
// import VendorRegister from "./vendor-app/pages/VendorRegister";

// axios.defaults.baseURL = "http://localhost:5000";
// axios.interceptors.request.use((request) => {
// 	console.log("Starting Request", JSON.stringify(request, null, 2));
// 	return request;
// });

// eslint-disable-next-line no-unused-vars
let logoutTimer;

export function App() {
	const [token, setToken] = useState(null);
	const [loginType, setLoginType] = useState(null);
	const [tokenExpDate, setTokenExpDate] = useState();

	// Used for Context (callback used to avoid infinite loop), if user is logged in, it will store token to localStorage and give access to axios DB
	const login = useCallback((token, loginType, expDate) => {
		setToken(token);
		setLoginType(loginType);
		const tokenExpDate =
			expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpDate(tokenExpDate);
		axios.defaults.headers.common["x-access-token"] = token;
		localStorage.setItem(
			"userData",
			JSON.stringify({
				token: token,
				loginType: loginType,
				expiration: tokenExpDate.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setLoginType(null);
		setTokenExpDate(null);
		delete axios.defaults.headers.common["x-access-token"];
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		if (token && loginType && tokenExpDate) {
			const time = tokenExpDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, time);
		} else {
			clearTimeout();
		}
	}, [token, loginType, logout, tokenExpDate]);

	// Authentication and if there is a token in localStorage, set the login status to be Logged in
	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("userData"));
		if (storedData && storedData.token && storedData.loginType) {
			login(storedData.token, storedData.loginType);
		}
	}, [login]);

	let Routes;
	if (token && loginType == "vendor") {
		Routes = (
			<Switch>
				<Route path="/customer" exact>
					<Welcome />
				</Route>
				<Route path="/" exact>
					<Main />
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
				<Route path="/customer/myaccount">
					<MyAccount />
				</Route>
				<Route path="/customer/login">
					<Redirect to="/vendor" />
				</Route>
				<Route path="/customer/register">
					<Redirect to="/vendor" />
				</Route>
				<Route path="/customer/cart">
					<Cart />
				</Route>
				<Route path="/vendor" exact>
					<VendorWelcome />
				</Route>
				<Route path="/vendor/login">
					<Login />
				</Route>
				<Route path="/vendor/register">
					<Register />
				</Route>
				<Route path="/vendor/address">
					<VendorAddress />
				</Route>
				<Route path="/vendor/close">
					<VendorClose />
				</Route>
				<Route path="/vendor/orderlist">
					<VendorOrderList />
				</Route>
				<Route path="/vendor/orderdetails">
					<VendorOrderDetails />
				</Route>
				<Route path="/vendor/profile">
					<VendorProfile />
				</Route>

				<Route>
					<Error />
				</Route>
			</Switch>
		);
	} else if (token && loginType == "customer") {
		Routes = (
			<Switch>
				<Route path="/customer" exact>
					<Welcome />
				</Route>
				<Route path="/" exact>
					<Main />
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
				<Route path="/customer/myaccount">
					<MyAccount />
				</Route>
				<Route path="/customer/login">
					<Redirect to="/vendor" />
				</Route>
				<Route path="/customer/register">
					<Redirect to="/vendor" />
				</Route>
				<Route path="/customer/cart">
					<Cart />
				</Route>
				<Route path="/vendor" exact>
					<VendorWelcome />
				</Route>
				<Route path="/vendor/login">
					<Login />
				</Route>
				<Route path="/vendor/register">
					<Register />
				</Route>
				<Route path="/vendor/address">
					<VendorAddress />
				</Route>
				<Route path="/vendor/close">
					<VendorClose />
				</Route>
				<Route path="/vendor/orderlist">
					<VendorOrderList />
				</Route>
				<Route path="/vendor/orderdetails">
					<VendorOrderDetails />
				</Route>
				<Route path="/vendor/profile">
					<VendorProfile />
				</Route>
				<Route>
					<Error />
				</Route>
			</Switch>
		);
	} else {
		Routes = (
			<Switch>
				<Route path="/customer" exact>
					<Welcome />
				</Route>
				<Route path="/" exact>
					<Main />
				</Route>
				<Route path="/customer/orderhistory">
					<Redirect to="/customer" />
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
				<Route path="/vendor" exact>
					<VendorWelcome />
				</Route>
				<Route path="/vendor/login">
					<Login />
				</Route>
				<Route path="/vendor/register">
					<Register />
				</Route>
				<Route path="/vendor/address">
					<VendorAddress />
				</Route>
				<Route path="/vendor/close">
					<VendorClose />
				</Route>
				<Route path="/vendor/orderlist">
					<VendorOrderList />
				</Route>
				<Route path="/vendor/orderdetails">
					<VendorOrderDetails />
				</Route>
				<Route path="/vendor/profile">
					<VendorProfile />
				</Route>
				<Route>
					<Error />
				</Route>
			</Switch>
		);
	}

	return (
		//  Used context to make every page render the token, before rendering pages, it will bind the values in the context
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				login: login,
				logout: logout,
				loginType: loginType,
			}}
		>
			<Router>
				<Header />
				{Routes}
				<Footer />
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
