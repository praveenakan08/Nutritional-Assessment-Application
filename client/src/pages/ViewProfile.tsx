import {
  Box,
  Button,
  FormLabel,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import CommonNavBar from "../Components/CommonNavBar";
import axios from "axios";
import { useState } from "react";
const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
  },
  typography: {
    fontFamily: ["tinos"].join(","),
  },
});

const ViewProfile = (): JSX.Element => {
  const [user, setUser] = useState();
  const email = localStorage.getItem("email")
  axios.get(`http://localhost:3001/register?email=${email}`)
  .then((result: any) => {
    if (!result){
      setUser(result)
    }
    console.log("User!!!!", result);
  })
  .catch((err: any) => {
    console.log(err);
  });
  
  return (
    <ThemeProvider theme={theme}>
      <CommonNavBar></CommonNavBar>
      <Grid alignItems="center" spacing={3}>
            <Grid item>
              <FormLabel id="name">Name</FormLabel>
              <TextField
                fullWidth
                value= {user?.name}
              />
            </Grid>
            <Grid item>
              <FormLabel id="email">Email</FormLabel>
              <TextField
                fullWidth
                // placeholder="Enter your Email"
                value="sdfaf"
                // {email}
              />
            </Grid>
            <Grid item>
              <FormLabel id="age">Age</FormLabel>
              <TextField
                fullWidth
                // placeholder="Enter your age"
                type="number"
                value="23"
                // {age}
              />
            </Grid>
            <Grid item>
              <FormLabel id="height">Height</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your height"
                id="height"
                // required={true}
                value="23"
              />
            </Grid>
            <Grid item>
              <FormLabel id="weight">Weight</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your weight"
                id="weight"
                // required={true}
                value="45"
              />  
            </Grid>
            <Grid item style={{textAlign:'center'}}>
              <Button
                variant="contained"
                color="success"
                size="large"
                type="submit"
              >
                Edit Profile
              </Button>

            </Grid>
          </Grid>
    </ThemeProvider>
  );
};

export default ViewProfile;
