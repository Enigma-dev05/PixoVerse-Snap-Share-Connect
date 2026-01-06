import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import GetCurrentUser from "./hooks/getCurrentUser";
import GetSuggestedUsers from "./hooks/getSuggestedUsers";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Upload from "./pages/Upload";
import GetAllPost from "./hooks/getAllPost";
import Loops from "./pages/Loops";
import GetAllLoops from "./hooks/getAllLoops";

export const serverUrl = "http://localhost:5000";

function App() {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      {userData && <GetCurrentUser />}
      {userData && <GetSuggestedUsers />}
      {userData && <GetAllPost />}
      {userData && <GetAllLoops />}

      <Routes>
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile/:userName"
          element={userData ? <Profile /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/upload"
          element={userData ? <Upload /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/loops"
          element={userData ? <Loops /> : <Navigate to={"/signin"} />}
        />
      </Routes>
    </>
  );
}

export default App;
