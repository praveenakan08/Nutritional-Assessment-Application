import { Container } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "./App.css";
import Dashboard from "./Components/Dashboard";

// import Logo from "../public/nutrifit-logo.jpg";

const App = (): JSX.Element => {
  return (
    <Container>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Container>
  );
};

export default App;
