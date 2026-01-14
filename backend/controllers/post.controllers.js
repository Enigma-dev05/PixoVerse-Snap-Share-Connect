import uploadOnCloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { io } from "../socket.js";

export const uploadPost = async (req, res) => {
  try {
    const { caption, mediaType } = req.body;
    let media;
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "Media Required!" });
    }

    const post = await Post.create({
      caption,
      media,
      mediaType,
      author: req.userId,
    });

    const user = await User.findById(req.userId);
    user.posts.push(post._id);
    await user.save();

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name userName profileImage"
    );

    return res.status(201).json(populatedPost);
  } catch (error) {
    return res.status(500).json({ message: `UploadPost Error ${error}!` });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name userName profileImage")
      .populate("comments.author", "userName profileImage")
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: `GetAllPosts Error ${error}!` });
  }
};

export const like = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ message: "Post Was Not Found!" });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === req.userId.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.userId.toString()
      );
    } else {
      post.likes.push(req.userId);
    }

    await post.save();
    await post.populate("author", "name userName profileImage");

    io.emit("likedPost", {
      postId: post._id,
      likes: post.likes,
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: `Like Post Error ${error}!` });
  }
};

export const comments = async (req, res) => {
  try {
    const { message } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    post.comments.push({
      author: req.userId,
      message,
    });

    await post.save();

    await post.populate("author", "userName profileImage");
    await post.populate("comments.author", "userName profileImage");

    io.emit("commentedPost", {
      postId: post._id,
      comments: post.comments,
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error("COMMENT ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const saved = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    const user = await User.findById(req.userId);

    if (!post) {
      return res.status(400).json({ message: "Post Was Not Found!" });
    }

    const alreadySaved = user.saved.some(
      (id) => id.toString() === postId.toString()
    );

    if (alreadySaved) {
      user.saved = user.saved.filter(
        (id) => id.toString() !== postId.toString()
      );
    } else {
      user.saved.push(postId);
    }

    await user.save();
    user.populate("saved");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Saved Post Error ${error}!` });
  }
};
