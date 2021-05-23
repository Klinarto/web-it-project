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

  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [password, setPassword] = useState("");

  // open state for materialUI snackbar
  const [open, setOpen] = useState(false);

  // details for materialUI snackbar
  const [snackbar, setSnackbar] = useState({});

  const onChange = (e) => {
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

      default:
        break;
    }
  };

  // duration for snackbar
  const duration = 3000;

  // send username and password on form submission
  const sendData = async () => {
    // create a data object for axios post
    const data = { email: email, password: password };
    console.log(data);
    try {
      const res = await axios.post("/customer/login", data, {
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

      // store token
      // localStorage.setItem("token", res.data.token);
      auth.login(res.data.token);
      history.push("/customer/menu");
    } catch (valid) {
      console.log(valid);

      // set snackbar details
      setOpen(true);
      setSnackbar({
        data: valid.response.data,
        severity: "valid",
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendData();
    }
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
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            error={emailHelper.length !== 0}
            helperText={emailHelper}
            onChange={onChange}
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
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
              <Link to="/customer/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
