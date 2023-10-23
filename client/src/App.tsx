import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadImage from "./pages/UploadImage";
import AnalyzeImage from "./pages/AnalyzeImage";
import ViewProfile from "./pages/ViewProfile";
import CommonNavBar from "./components/CommonNavBar";
import useLoginCheck from "./userLoginCheck";

const AppLayout = () => (
  <>
    <CommonNavBar />
    <div>
      <Outlet />
    </div>
  </>
);

const App = (): JSX.Element => {
  const isLoginCheckComplete = useLoginCheck();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);

    if (isLoginCheckComplete) {
      setIsLoading(false);
    }
  }, [isLoginCheckComplete]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {!isLoading && (
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/uploadImage" element={<UploadImage />} />
          <Route path="/analyzeImage" element={<AnalyzeImage />} />
          <Route path="/viewProfile" element={<ViewProfile />} />
        </Route>)
}
      </Routes>
    </>
  );
};

export default App;
