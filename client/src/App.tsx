import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadImage from "./pages/UploadImage";

// import Logo from "../public/nutrifit-logo.jpg";

const App = (): JSX.Element => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadImage />} />
      </Routes>
    </Container>
  );
};

export default App;
