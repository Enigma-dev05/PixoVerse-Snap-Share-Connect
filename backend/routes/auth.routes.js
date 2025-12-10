import express from "express";
import {
  sendOtp,
  verifyOtp,
  resetPassword,
  signUp,
  signIn,
  signOut,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/sendOtp", sendOtp);
authRouter.post("/verifyOtp", verifyOtp);
authRouter.post("/resetPassword", resetPassword);
authRouter.get("/signout", signOut);

export default authRouter;
