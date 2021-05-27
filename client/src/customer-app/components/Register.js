import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function Register() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // open state for materialUI snackbar
  const [open, setOpen] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");

  const onChange = (e) => {
    let validAlpha;
    let validDigit;
    let validLength;
    let valid;

    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          e.target.value
        );

        if (!valid) {
          setEmailHelper("Invalid Email");
        } else {
          setEmailHelper("");
        }
        break;
      case "password":
        setPassword(e.target.value);
        validAlpha = /^.*[a-zA-Z][^a-zA-Z]*$/.test(e.target.value);
        validDigit = /^.*[0-9][^0-9]*$/.test(e.target.value);
        validLength = /^.{8,}$/.test(e.target.value);

        if (!validAlpha) {
          setPasswordHelper("Password should have at least one alphabet (a-Z)");
        } else if (!validDigit) {
          setPasswordHelper("Password should have at least one number (0)");
        } else if (!validLength) {
          setPasswordHelper("Passwrod should be at least 8 characters long");
        } else {
          setPasswordHelper("");
        }
        break;

      default:
        break;
    }
  };

  // details for materialUI snackbar
  const [snackbar, setSnackbar] = useState({});

  // duration for snackbar
  const duration = 3000;

  const sendData = async () => {
    // create a data object to register new customer
    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    console.log(data);

    const res = await axios.post("/customer/register", data, {
      headers: { "Content-Type": "application/json" },
    });
    try {
      // set snackbar details
      setOpen(true);
      setSnackbar({
        data: "Successfully registered",
        severity: "success",
      });
      console.log(res);
      console.log(res.data);
      history.push("/customer/menu");
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
      <div>
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
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
                error={emailHelper.length !== 0}
                helperText={emailHelper}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChange}
                error={passwordHelper.length !== 0}
                helperText={passwordHelper}
              />
            </Grid>
          </Grid>

          <Button
            // type="submit"
            fullWidth
            disabled={
              firstName.length === 0 ||
              lastName.length === 0 ||
              email.length === 0 ||
              password.length === 0 ||
              emailHelper.length !== 0 ||
              passwordHelper.length !== 0
            }
            variant="contained"
            color="primary"
            style={{
              // backgroundColor: "#000",
              padding: "16px 0",
              marginTop: "16px",
            }}
            onClick={sendData}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}
