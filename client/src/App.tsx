import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadImage from "./pages/UploadImage";
import AnalyzeImage from "./pages/AnalyzeImage";
import ViewProfile from "./pages/ViewProfile";

// import Logo from "../public/nutrifit-logo.jpg";

const App = (): JSX.Element => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploadImage" element={<UploadImage />} />
        <Route path="/analyzeImage" element={<AnalyzeImage />} />
        <Route path="/viewProfile" element={<ViewProfile />} />
      </Routes>
    </Container>
  );
};

export default App;
