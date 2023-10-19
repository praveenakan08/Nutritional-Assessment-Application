import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  FormLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
    fontFamily: [
      'tinos',
    ].join(','),
  },
});

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formInput: any) => {
    formInput.preventDefault();
    axios
      .get(`http://localhost:3001/register?email=${email}`)
      .then((result: any) => {
        localStorage.setItem("email", email || '')
        console.log("Login Result", result);
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
          width: 400,
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
              <FormLabel id="email">Email</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your Email"
                aria-label="email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="password">Password</FormLabel>
              <TextField
                fullWidth
                aria-label="password"
                placeholder="Enter your password"
                type="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} style={{textAlign:'center'}}>
              <Button variant="contained" color="success" size="large">
                Login
              </Button>
            </Grid>
            <Grid item xs={12} style={{textAlign:'center'}}>
              <Link to="/register">New user? Sign up Here!</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
