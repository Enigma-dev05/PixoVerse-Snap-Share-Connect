import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import {
  uploadLoop,
  getAllLoops,
  like,
  comments,
} from "../controllers/loop.controllers.js";

const LoopRouter = express.Router();

LoopRouter.post("/upload", isAuth, upload.single("media"), uploadLoop);
LoopRouter.get("/getAll", isAuth, getAllLoops);
LoopRouter.get("/like/:loopId", isAuth, like);
LoopRouter.post("/comment/:loopId", isAuth, comments);

export default LoopRouter;
