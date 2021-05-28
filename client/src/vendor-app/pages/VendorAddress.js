import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import {
	Container,
	DivisionButton,
	LocationDetail,
} from "./VendorAddress.style";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Map from "../../shared/components/Map";
import useCurrentLocation from "../../shared/components/useCurrentLocation";

// Simple Help Page
export function VendorAddress() {
	const history = useHistory();

	const [locDetail, setLocDetail] = useState("");
	const currentLocation = useCurrentLocation();

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#aad9cd",
			},
		},
	});

	const openVan = async (status) => {
		try {
			const res = await axios.put(`/vendor/address`, status);
			console.log(res);
		} catch (error) {
			console.log(error.response.data);
		}
		return;
	};

	const updateLocation = async (locD) => {
		try {
			const res = await axios.put(`/vendor/address`, locD);
			console.log(res);
		} catch (error) {
			console.log(error.response.data);
		}
		return;
	};

	return (
		<Container>
			<Map />
			<LocationDetail>
				<Grid item xs={12}>
					<TextField
						variant="filled"
						required
						fullWidth
						name="location detail"
						label="location detail"
						id="locDetail"
						style={{ backgroundColor: "#FFFFFF", opacity: 1 }}
						value={locDetail}
						onChange={(e) => setLocDetail(e.target.value)}
					/>
				</Grid>
				<DivisionButton>
					<ThemeProvider theme={theme}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								updateLocation({ locationDetails: locDetail });
								console.log(currentLocation)
								console.log({ locationDetails: locDetail });
							}}
						>
							update
						</Button>
					</ThemeProvider>
				</DivisionButton>
				<DivisionButton>
					<ThemeProvider theme={theme}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								history.push("/vendor/orderlist");
								openVan({ status: "open" });
							}}
						>
							open
						</Button>
					</ThemeProvider>
				</DivisionButton>
			</LocationDetail>
		</Container>
	);
}

export default VendorAddress;
