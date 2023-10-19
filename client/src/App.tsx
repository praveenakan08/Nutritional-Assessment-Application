import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadImage from "./pages/UploadImage";
import AnalyzeImage from "./pages/AnalyzeImage";
import ViewProfile from "./pages/ViewProfile";

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/uploadImage" element={<UploadImage />} />
      <Route path="/analyzeImage" element={<AnalyzeImage />} />
      <Route path="/viewProfile" element={<ViewProfile />} />
    </Routes>
  );
};

export default App;
