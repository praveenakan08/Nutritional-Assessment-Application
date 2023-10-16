import { Container } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import UploadImage from "./Components/UploadImage";
import AnalyzeImage from "./Components/AnalyzeImage";
import ViewProfile from "./Components/ViewProfile";

// import Logo from "../public/nutrifit-logo.jpg";

const App = (): JSX.Element => {
  return (
    <Container>
      <Routes>
        <Route path="/register" element={<Register />} />
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
