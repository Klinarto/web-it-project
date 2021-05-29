import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";

const LinkDiv = styled.div`
  text-align: left;
`;

export default function Register() {
  const [formData, setFormData] = useState(null);

  // open state for materialUI snackbar
  const [open, setOpen] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");

  const pathname = useLocation().pathname;

  const redirectBack = () => {
    if (pathname.includes("/customer")) {
      return (
        <LinkDiv>
          <Link to="/customer/login">Go Back to Login Page</Link>
        </LinkDiv>
      );
    }
    return (
      <LinkDiv>
        <Link to="/vendor/login">Go Back to Login Page</Link>
      </LinkDiv>
    );
  };

  useEffect(() => {
    if (pathname.includes("vendor")) {
      setFormData({ name: "", password: "" });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
    return () => {};
  }, []);

  const onChange = (e) => {
    let validAlpha;
    let validDigit;
    let validLength;
    let valid;

    switch (e.target.id) {
      case "email":
        setFormData((prevState) => {
          return { ...prevState, email: e.target.value };
        });
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
        setFormData((prevState) => {
          return { ...prevState, password: e.target.value };
        });
        validAlpha = /^.*[a-zA-Z][^a-zA-Z]*$/.test(e.target.value);
        validDigit = /^.*[0-9][^0-9]*$/.test(e.target.value);
        validLength = /^.{8,}$/.test(e.target.value);

        if (!validAlpha) {
          setPasswordHelper("Password should have at least one alphabet (a-Z)");
        } else if (!validDigit) {
          setPasswordHelper("Password should have at least one number (0)");
        } else if (!validLength) {
          setPasswordHelper("Password should be at least 8 characters long");
        } else {
          setPasswordHelper("");
        }
        break;

      default:
        // console.log(e.target.id, e.target.value);
        setFormData((prevState) => {
          return { ...prevState, [e.target.id]: e.target.value };
        });
        break;
    }
  };

  // details for materialUI snackbar
  const [snackbar, setSnackbar] = useState({});

  // duration for snackbar
  const duration = 3000;

  // console.log(formData);

  const sendData = async () => {
    console.log(formData);

    const res = await axios.post(pathname, formData, {
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

  const renderForm = () => {
    // console.log(formData);
    if (formData) {
      if (pathname.includes("vendor")) {
        return (
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Vendor Name"
                  name="Vendor Name"
                  autoComplete="Vendor Name"
                  value={formData.name}
                  onChange={onChange}
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
                  value={formData.password}
                  onChange={onChange}
                  error={passwordHelper.length !== 0}
                  helperText={passwordHelper}
                />
              </Grid>
            </Grid>

            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                // backgroundColor: "#000",
                padding: "16px 0",
                marginTop: "16px",
              }}
              onClick={() => {
                sendData();
              }}
              disabled={
                formData.name.length === 0 ||
                formData.password.length === 0 ||
                passwordHelper.length !== 0
              }
            >
              Register
            </Button>
          </form>
        );
      } else {
        return (
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
                  value={formData.firstName}
                  onChange={onChange}
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
                  value={formData.lastName}
                  onChange={onChange}
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
                  value={formData.email}
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
                  value={formData.password}
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
                formData.firstName.length === 0 ||
                formData.lastName.length === 0 ||
                formData.email.length === 0 ||
                formData.password.length === 0 ||
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
        );
      }
    }
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
        {renderForm()}
        {redirectBack()}
      </div>
    </Container>
  );
}
