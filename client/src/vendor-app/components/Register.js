import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";



export default function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  // open state for materialUI snackbar
  const [open, setOpen] = useState(false);

  // details for materialUI snackbar
  const [snackbar, setSnackbar] = useState({});

  // duration for snackbar
  const duration = 3000;

  const sendData = async () => {
    // create a data object to register new customer
    const data = {
      name,
      password,
    };

    console.log(data);

    const res = await axios.post("/vendor/register", data, {
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Vendor Name"
                name="Vendor Name"
                autoComplete="Vendor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

          </Grid>

          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#000",
              padding: "16px 0",
              marginTop: "16px",
            }}
            onClick={() => {sendData(); history.push("/vendor/orderlist")}}
          >
            Register
  
          </Button>
        </form>
      </div>
    </Container>
  );
}
