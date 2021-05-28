import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Edit, ButDiv, BackDiv, Division} from "../pages/MyAccount.style";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from "axios";


export default function EditProfile(props) {
    const changeState =props.changeState
    const { email, lastName, firstName } = props.customer;
    
    const [upFirstName, setFirstName] = useState(firstName);
    const [upLastName, setLastName] = useState(lastName);
    const [upEmail, setEmail] = useState(email);

    const [emailHelper, setEmailHelper] = useState("");

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
        }
    };

    const updateProfile = async (updated) => {
		try {
			console.log(JSON.parse(updated));
			const res = await axios.put("/customer/me", JSON.parse(updated));
			console.log(res);
		} catch (error) {
			console.log(error.response.data);
		}
		return;
	};

    return(
        <Division>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={upFirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={upLastName}
                    onChange={(e) => setLastName(e.target.value)}
             
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={upEmail}
                    onChange={onChange}
                    error={emailHelper.length !== 0}
                    helperText={emailHelper}
                />
                </Grid>
            </Grid>
            <ButDiv>
            <BackDiv>
            <ArrowBackIosIcon onClick={() => changeState()}></ArrowBackIosIcon>
            </BackDiv>
            <Edit>
            <Button 
            color="primary"
            
            onClick={() => {
                updateProfile(`{"firstName":"${upFirstName}","lastName":"${upLastName}", "email":"${upEmail}"}`);
                window.location.reload()}}
            >Submit</Button>
            </Edit>

            </ButDiv>
        </Division>
        );
}

