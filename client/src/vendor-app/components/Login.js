import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { AuthContext } from "../../shared/auth-context";

export default function SignIn() {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	// open state for materialUI snackbar
	const [open, setOpen] = useState(false);

	// details for materialUI snackbar
	const [snackbar, setSnackbar] = useState({});

	// duration for snackbar
	const duration = 3000;

	// send username and password on form submission
	const sendData = async () => {
		// create a data object for axios post
		const data = { name: name, password: password };
		console.log(data);
		try {
			const res = await axios.post("/vendor/login", data, {
				headers: { "Content-Type": "application/json" },
			});
			// set snackbar details
			setOpen(true);
			setSnackbar({
				data: "Login successful",
				severity: "success",
			});

			console.log(res);
			console.log(res.data);
			console.log(name);
			// store token
			// localStorage.setItem("token", res.data.token);
			auth.login(res.data.token, "vendor");

			history.push({ pathname: "/vendor/address" });
		} catch (error) {
			console.log(error);

			// set snackbar details
			setOpen(true);
			setSnackbar({
				data: error.response.data,
				severity: "error",
			});
		}
	};

	// handleclose template from materialUI docs
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={open}
				autoHideDuration={duration}
				onClose={handleClose}
			>
				<Alert severity={snackbar.severity} onClose={handleClose}>
					{snackbar.data}
				</Alert>
			</Snackbar>
			<div>
				<form noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Van name"
						autoComplete="email"
						autoFocus
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						// type="submit"
						fullWidth
						variant="contained"
						color="primary"
						style={{
							backgroundColor: "#000",
							padding: "16px 0",
						}}
						onClick={() => {
							sendData();
						}}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link to="/vendor/register">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
