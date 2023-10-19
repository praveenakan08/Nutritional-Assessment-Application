import {
  Button,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import CommonNavBar from "../Components/CommonNavBar";
import { useState } from "react";
import axios from "axios";
import { error } from "console";

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
  const email = 'abc@gmail.com'
  const userDetails = axios
    .get("http://localhost:3001/api/viewProfile", email as any)
    .then(res => setUser(res.data))
    .then()
  
  return (
    <ThemeProvider theme={theme}>
      <CommonNavBar></CommonNavBar>
      {/* <Grid>
            <Typography>Email : {user.email}</Typography>
            <Typography>Age : {user.email} </Typography>
            <Typography>Gender : {user.gender}</Typography>
            <Typography>Height : {user.height}</Typography>
            <Typography>Weight : {user.weight}</Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            type="submit"
          >
            Edit Profile
          </Button>
      </Grid> */}
    </ThemeProvider>
  );
};

export default ViewProfile;
