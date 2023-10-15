import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";

// import Logo from "../public/nutrifit-logo.jpg";

const App = (): JSX.Element => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Container>
  );
};

export default App;
