
import Button from "@material-ui/core/Button";
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import { useHistory } from "react-router-dom";
import{Container, DivisionButton, LocationDetail} from "./VendorAddress.style"
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { useLocation } from "react-router";
import TextField from "@material-ui/core/TextField";
import axios from "axios";



// Simple Help Page
export function VendorAddress() {

  const vanname = useLocation().state;
  console.log(vanname)
  const history = useHistory();


  const [locDetail, setLocDetail] = useState("");
  

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#aad9cd',
      },}});

  const openVan = async (status) => {
    try {
      console.log(JSON.parse(status))		 
      const res = await axios.put(`/vendor/${vanname}`, JSON.parse(status))
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
    return;
    };

  const updateLocation = async (locD) => {
    try {
      console.log(JSON.parse(locD))		 
      const res = await axios.put(`/vendor/locdetail/${vanname}`, JSON.parse(locD))
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
    return;
    };

  return (
    <Container>
      <LocationDetail>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          required
          fullWidth
          name="location detail"
          label="location detail"
          id="locDetail"
          style={{ backgroundColor: "#FFFFFF" , opacity: 1 }}
          value={locDetail}
          onChange={(e) => setLocDetail(e.target.value)}
        />
      </Grid>
      <DivisionButton><ThemeProvider theme={theme}><Button
						variant="contained" color="primary"
						onClick={() => {updateLocation(`{"locationDetails":"${locDetail}"}`); console.log(`{"locationDetails":"${locDetail}"}`)}}>
						update
				</Button></ThemeProvider></DivisionButton>					
        <DivisionButton><ThemeProvider theme={theme}><Button
						variant="contained" color="primary"
						onClick={() => {history.push("/vendor/orderlist"); openVan('{"status":"open"}')}}>
						open
				</Button></ThemeProvider></DivisionButton>
      </LocationDetail>
    </Container>
  );
}

export default VendorAddress;
