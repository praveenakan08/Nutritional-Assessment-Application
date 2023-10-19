import {
  ThemeProvider,
  createTheme,
  Box,
  Grid,
  Typography,
  FormLabel,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
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
    axios
      .get(`http://localhost:3001/api/viewProfile?${email}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.log("Error", err);
      });
  });

  return (
    <div
      className="register-page"
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            marginTop: 2,
            marginBottom: 2,
            justifyItems: "center",
            width: 500,
          }}
        >
          <form>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ bgcolor: "#1b5e20" }}>
                  <Typography
                    variant="h3"
                    component="h3"
                    color="white"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <img
                      src="/nutrifit-logo.png"
                      height={60}
                      width={60}
                      alt="Logo"
                    />
                    <Box sx={{ paddingLeft: "4px" }}>NutriFit</Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="name">Name</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your Name"
                  value={user?.name}
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="email">Email</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your Email"
                  value={user?.email}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel id="age">Age</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your age"
                  type="number"
                  value={user?.age}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel id="gender">Gender</FormLabel>
                <RadioGroup row aria-label="gender" name="gender">
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    checked={user?.gender === "female"}
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    checked={user?.gender === "male"}
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6}>
                <FormLabel id="height">Height</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your height"
                  id="height"
                  required={true}
                  value={user?.height}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel id="weight">Weight</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your weight"
                  id="weight"
                  required={true}
                  value={user?.weight}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default ViewProfile;
