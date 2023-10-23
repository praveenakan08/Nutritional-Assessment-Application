import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Box,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  ThemeProvider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { theme } from "../common/theme";

const Register = (): JSX.Element => {
  const history = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formInput: any) => {
    axios
      .post("http://localhost:3001/api/register", {
        name,
        email,
        gender,
        age,
        height,
        weight,
        password,
      })
      .then((result: any) => {
        console.log("Register Result", result);
        if (result.data.status === 200) {
          alert(result.data.message);
          history("/login");
        } else {
          alert(result.data.message);
          history("/");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                <FormLabel id="weight">Weight</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your weight"
                  id="weight"
                  required={true}
                  error={weight == null}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Link to="/login">Already Registered? Login Here!</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Register;
