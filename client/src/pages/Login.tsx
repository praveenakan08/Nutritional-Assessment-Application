import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Box,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../axiosCalls";

const Login = (): JSX.Element => {
  const history = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    setLoader(true);
    const result = await login({ email, password });

    if (result.success) {
      alert(result.message);
      history("/dashboard");
    } else {
      alert(result.message);
      history("/");
    }

    setLoader(false);
  };

  return (
    <Box
      className="register-page"
      style={{
        width: "100%",
        height: "800px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          marginTop: 15,
          justifyItems: "center",
          width: 400,
          height: 400,
        }}
      >
        {loader && <CircularProgress color="success" />}
        {!loader && (
          <Box onSubmit={handleSubmit(onSubmit)} component="form">
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
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Link to="/register">New user? Sign up Here!</Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Login;
