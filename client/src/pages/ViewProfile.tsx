import { ThemeProvider, createTheme, Box, Grid, Button } from "@mui/material";
import CommonNavBar from "../components/CommonNavBar";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { getUserDetails } from "../axiosCalls";

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
    const getUser = async () => {
      try {
        const user = await getUserDetails({email});
        setUser(user);
      } catch (error) {
        alert('User Fetch failed!');
      }
    };
  
    getUser();
  }, [email]);
  
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
