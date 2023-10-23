import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadImage from "./pages/UploadImage";
import AnalyzeImage from "./pages/AnalyzeImage";
import ViewProfile from "./pages/ViewProfile";
import CommonNavBar from "./components/CommonNavBar";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./common/theme";
import { Box } from "@mui/material";

const AppLayout = () => (
  <>
    <CommonNavBar />
    <Box>
      <Outlet />
    </Box>
  </>
);

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/uploadImage" element={<UploadImage />} />
          <Route path="/analyzeImage" element={<AnalyzeImage />} />
          <Route path="/viewProfile" element={<ViewProfile />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
