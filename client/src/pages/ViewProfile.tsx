import {
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

import { useEffect, useState } from "react";
import axios from "axios";

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
          <TextField fullWidth value="Mansi" />
        </Grid>
        <Grid item>
          <FormLabel id="email">Email</FormLabel>
          <TextField
            fullWidth
            // placeholder="Enter your Email"
            value="mansi.rathi@gmail.com"
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
            value="5.1"
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
  );
};

export default ViewProfile;
