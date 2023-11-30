import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Box,
  FormLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../axiosCalls";
import { Bars } from "react-loader-spinner";

const Login = (): JSX.Element => {
  const history = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    //setLoader(true);
    const result = await login({ email, password });
    //setLoader(false);
    if (result.success) {
      alert(result.message);
      history("/dashboard");
    } else {
      alert(result.message);
      history("/");
    }
  };

  return (
    <Box
      className="register-page"
      style={{
        width: "1500px",
        display: "flex",
        height: "800px",
        justifyContent: "center",
        //backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)`,
      }}
    >
      {loader && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Box>
      )}
      {!loader && (
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
        </Box>
      )}
    </Box>
  );
};

export default Login;
