import {
  ThemeProvider,
  createTheme,
  Box,
  Grid,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";
import CommonNavBar from "../components/CommonNavBar";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [user, setUser] = useState<any>();
  const email = localStorage.getItem("email");

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/viewProfile?email=${email}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    getUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CommonNavBar></CommonNavBar>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          marginTop: 14,
          marginBottom: 2,
          justifyItems: "center",
          width: 500,
        }}
      >
        <Grid alignItems="center" spacing={3}>
          <Grid item>
            <FormLabel id="name">Name</FormLabel>
            <TextField fullWidth value={user ? user.name : ""} />
          </Grid>
          <Grid item>
            <FormLabel id="email">Email</FormLabel>
            <TextField fullWidth value={user ? user.email : ""} />
          </Grid>
          <Grid item>
            <FormLabel id="age">Age</FormLabel>
            <TextField fullWidth type="number" value={user ? user.age : ""} />
          </Grid>
          <Grid item>
            <FormLabel id="height">Height</FormLabel>
            <TextField
              fullWidth
              placeholder="Enter your height"
              id="height"
              value={user ? user.height : ""}
            />
          </Grid>
          <Grid item>
            <FormLabel id="weight">Weight</FormLabel>
            <TextField
              fullWidth
              placeholder="Enter your weight"
              id="weight"
              value={user ? user.weight : ""}
            />
          </Grid>
          <Grid item style={{ textAlign: "center", paddingTop: 10 }}>
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
      </Box>
    </ThemeProvider>
  );
};

export default ViewProfile;
