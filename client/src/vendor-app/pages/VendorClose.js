import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { Container, DivisionButton, Closing, Box } from "./VendorAddress.style";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../shared/auth-context";
import axios from "axios";

import { Time } from "../pages/VendorOrderDetail.style";

// Simple Help Page
export function VendorClose() {
	// const vanname = useLocation().state;
	// console.log(vanname)
	const auth = useContext(AuthContext);
	const history = useHistory();
	const vanname = "Coffee2Go";

	const Interval = () => {
		const [seconds, setSeconds] = useState(60);
		var min = 0;
		var sec = 0;

		useEffect(() => {
			const interval = setInterval(() => {
				setSeconds((seconds) => seconds - 1);
			}, 1000);
			return () => clearInterval(interval);
		}, []);

		min = Math.floor(seconds / 60);
		sec = ("0" + (seconds % 60)).slice(-2);

		if (min <= 0 && sec <= 0) {
			min = 0;
			sec = "00";
			auth.logout();
			history.push("/vendor/");
		}

		return (
			<Time>
				{min}:{sec}
			</Time>
		);
	};

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#aad9cd",
			},
		},
	});

	const closeVan = async () => {
		try {
			console.log(JSON.parse('{"status":"closed"}'));
			const res = await axios.put(
				`/vendor/${vanname}`,
				JSON.parse('{"status":"closed"}', {
					headers: { "Content-Type": "application/json" },
				})
			);
			console.log(res);
		} catch (error) {
			console.log(error.response.data);
		}
		return;
	};

	return (
		<Container>
			<Box>
				<Closing>
					<Interval />
					<br></br>
				</Closing>
				Are you sure you want to Close the Business?
				<Closing>
					<DivisionButton>
						<ThemeProvider theme={theme}>
							<Button
								variant="contained"
								style={{ fontSize: "24px" }}
								onClick={() => {
									history.push("/vendor/orderlist");
								}}
							>
								Continue Business
							</Button>
						</ThemeProvider>
					</DivisionButton>
					<DivisionButton>
						<ThemeProvider theme={theme}>
							<Button
								variant="contained"
								color="secondary"
								style={{ fontSize: "24px" }}
								onClick={() => {
									closeVan();
									auth.logout();
									history.push("/");
								}}
							>
								Close Business
							</Button>
						</ThemeProvider>
					</DivisionButton>
				</Closing>
			</Box>
		</Container>
	);
}

export default VendorClose;
