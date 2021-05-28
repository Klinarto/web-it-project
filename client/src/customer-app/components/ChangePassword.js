import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Edit, ButDiv, BackDiv,Line, Division} from "../pages/MyAccount.style";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from "axios";


export default function ChangePassword({changePassword}) {
    const [currPass, setCurrPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [same , setSame]=useState(false);


    const updatePassword = async (updated) => {
		try {
			console.log(JSON.parse(updated));
			const res = await axios.put("/customer/me/password", JSON.parse(updated));
			console.log(res);
		} catch (error) {

			console.log(error.response.data);
		}
		return;
	};

    
    const [passwordHelper, setPasswordHelper] = useState("");
  
    const onChange = (e) => {
      let validAlpha;
      let validDigit;
      let validLength;
  
    switch (e.target.id) {
        case "New Password":
          setNewPass(e.target.value);
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
          break
      }
    };

    function differentPassword(){
        setSame(true);
    }

    return(
        <Division>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    name="Current Password"
                    variant="outlined"
                    fullWidth
                    id="Current Password"
                    type="password"
                    label="Current Password"
                    autoFocus
                    value={currPass}
                    onChange={(e) => setCurrPass(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    name="New Password"
                    variant="outlined"
                    fullWidth
                    id="New Password"
                    type="password"
                    label="New Password"
                    autoFocus
                    value={newPass}
                    onChange={onChange}
                    error={passwordHelper.length !== 0}
                    helperText={passwordHelper}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    type="password"
                    id="Confirm Password"
                    label="Confirm Password"
                    name="Confirm Password"
                    autoComplete="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}

                />
                </Grid>
            </Grid>

            {same ? <Line>Password is Same</Line> : <Line>Passwords are different</Line>}
            <ButDiv>
            <BackDiv>
            <ArrowBackIosIcon onClick={() => changePassword()}></ArrowBackIosIcon>
            </BackDiv>
            <Edit>
            
            
            <Button 
            variant="contained"
            onClick={() => {

                if(confirmPass===newPass ){
                    differentPassword();
                    updatePassword(`{"newPassword":"${newPass}","password":"${currPass}"}`);
                }else{
                    console.log(confirmPass);
                    console.log(newPass);                }
            }}
            >Submit</Button>
            
            </Edit>
            </ButDiv>
        </Division>    
    );
}