import { useState } from "react";
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
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { registerUser } from "../axiosCalls";

const Register = (): JSX.Element => {
  const history = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // let EMAIL_REGX =
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 10 characters"),
    age: Yup.string().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    weight: Yup.string().required("Weight is required"),
    height: Yup.string().required("Height is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formInput: any) => {
    const result = await registerUser({
      name,
      email,
      gender,
      age,
      height,
      weight,
      password,
    });

    if (result.success) {
      alert(result.message);
      history("/login");
    } else {
      alert(result.message);
      history("/");
    }
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
          marginTop: 2,
          marginBottom: 2,
          justifyItems: "center",
          width: 500,
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
              <FormLabel id="name">Name</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your Name"
                value={name}
                required={true}
                error={errors.name ? true : false}
                {...register("name")}
                onChange={(e) => setName(e.target.value)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.name?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="email">Email</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your Email"
                value={email}
                required={true}
                error={errors.email ? true : false}
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormLabel id="age">Age</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your age"
                type="number"
                value={age}
                required={true}
                error={errors.age ? true : false}
                {...register("age")}
                onChange={(e) => setAge(parseInt(e.target.value))}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.age?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormLabel id="gender">Gender</FormLabel>
              <FormControl
                error={!!errors.gender}
                style={{ display: "flex" }}
                {...register("gender")}
              >
                <RadioGroup
                  row
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio value="female" style={{ color: "lightgrey" }} />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio value="male" style={{ color: "lightgrey" }} />
                    }
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <Typography variant="inherit" color="textSecondary">
                {errors.gender?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormLabel id="height">Height</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your height"
                id="height"
                required={true}
                error={errors.height ? true : false}
                {...register("height")}
                onChange={(e) => setHeight(e.target.value)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.height?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormLabel id="weight">Weight</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your weight"
                id="weight"
                required={true}
                error={errors.weight ? true : false}
                {...register("weight")}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.weight?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="password">Password</FormLabel>
              <TextField
                fullWidth
                placeholder="Create your password"
                type="password"
                required={true}
                error={errors.password ? true : false}
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
