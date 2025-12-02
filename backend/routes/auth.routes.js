import express from "express";
import { signUp, signIn } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/singup", signUp);
authRouter.post("/singin", signIn);

export default authRouter;
