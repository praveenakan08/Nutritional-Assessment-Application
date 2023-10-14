import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
// import Logo from "../public/nutrifit-logo.jpg";

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
});

const Register = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bmi, setBmi] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formInput: any) => {
    // formInput.preventDefault();
    console.log("Form Input", formInput);
    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        gender,
        age,
        height,
        bmi,
        password,
      })
      .then((result: any) => {
        console.log("Register Result", result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          marginTop: 10,
          justifyItems: "center",
          width: 500,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ bgcolor: "#1b5e20" }}>
                <Typography
                  variant="h3"
                  component="h3"
                  color="white"
                  display={"flex"}
                  justifyContent={"center"}
                  fontFamily="sans-serif"
                >
                  <img
                    src="/nutrifit-logo.jpg"
                    height={60}
                    width={60}
                    alt="Logo"
                  />
                  <Box sx={{ paddingLeft: "4px" }}>Register</Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="name">Name</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your Name"
                value={name}
                required={true}
                error={!(name.length > 0)}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="email">Email</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your Email"
                value={email}
                required={true}
                error={!email.includes("@gmail.com")}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormLabel id="age">Age</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your age"
                type="number"
                value={age}
                required={true}
                error={!(age > 0)}
                onChange={(e) => setAge(parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={8}>
              <FormLabel id="gender">Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="gender">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={(e) => setGender("Female")}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={(e) => setGender("Male")}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  onChange={(e) => setGender("Other")}
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
                error={height == null}
                onChange={(e) => setHeight(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel id="bmi">Body Mass Index (BMI)</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your BMI"
                id="bmi"
                required={true}
                error={isNaN(parseInt(bmi))}
                onChange={(e) => setBmi(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel id="password">Password</FormLabel>
              <TextField
                fullWidth
                placeholder="Create your password"
                type="password"
                required={true}
                error={!(password.length > 6)}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} alignItems="center">
              <Button
                variant="contained"
                color="success"
                size="large"
                type="submit"
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12} alignItems="center">
              <Link to="/login">Already Registered?Login Here!</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
