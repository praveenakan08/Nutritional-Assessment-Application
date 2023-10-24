import { ThemeProvider, createTheme, Box, Grid, Button } from "@mui/material";
import CommonNavBar from "../components/CommonNavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "..";
import InputField from "../components/InputField";

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
          API_URL + `/viewProfile?email=${email}`
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
        <Grid container spacing={3}>
          <InputField label="Name" id="name" value={user?.name} />
          <InputField label="Email" id="email" value={user?.email} />
          <InputField label="Age" id="age" value={user?.age} />
          <InputField label="Height" id="height" value={user?.height} />
          <InputField label="Weight" id="weight" value={user?.weight} />
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
