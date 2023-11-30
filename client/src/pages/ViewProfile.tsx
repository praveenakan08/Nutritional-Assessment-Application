import { ThemeProvider, createTheme, Box, Grid, Button } from "@mui/material";
import CommonNavBar from "../components/CommonNavBar";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { getUserDetails } from "../axiosCalls";
import {
  TextField,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { registerUser } from "../axiosCalls";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserDetails({ email });
        setUser(user);
      } catch (error) {
        alert("User Fetch failed!");
      }
    };

    getUser();
  }, [email]);
  const onSubmit = async (formInput: any) => {
    // const result = await registerUser({
    //   name,
    //   email,
    //   gender,
    //   age,
    //   height,
    //   weight,
    //   password,
    // });
    // if (result.success) {
    //   alert(result.message);
    //   history("/login");
    // } else {
    //   alert(result.message);
    //   history("/");
    // }
  };

  return (
    <Box
      className="register-page"
      sx={{
        width: "1500px",
        display: "flex",
        justifyContent: "center",
        //backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)`,
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          marginTop: 20,
          marginBottom: 2,
          justifyItems: "center",
          width: 500,
        }}
      >
        <Box onSubmit={handleSubmit(onSubmit)} component="form">
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12}>
              <FormLabel id="name">Name</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your Name"
                value={user?.name}
                required={true}
                // error={errors.name ? true : false}
                // {...register("name")}
                // onChange={(e) => setName(e.target.value)}
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
              />
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
                value={45}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
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
      </Box>
    </Box>
  );
};

export default ViewProfile;
