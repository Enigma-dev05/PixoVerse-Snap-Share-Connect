import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import {
  uploadPost,
  getAllPosts,
  like,
  comments,
  saved,
} from "../controllers/post.controllers.js";
const postRouter = express.Router();

postRouter.post("/upload", isAuth, upload.single("media"), uploadPost);
postRouter.get("/getAll", isAuth, getAllPosts);
postRouter.get("/like/:postId", isAuth, like);
postRouter.get("/saved/:postId", isAuth, saved);
postRouter.post("/comment/:postId", isAuth, comments);

export default postRouter;
