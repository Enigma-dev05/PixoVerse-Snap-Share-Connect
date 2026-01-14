import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import Loop from "../models/loop.model.js";
import { io } from "../socket.js";

export const uploadLoop = async (req, res) => {
  try {
    const { caption } = req.body;
    let media;
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "Media Required!" });
    }

    const loop = await Loop.create({
      caption,
      media,
      author: req.userId,
    });

    const user = await User.findById(req.userId);
    user.loops.push(loop._id);
    await user.save();

    const populatedLoop = await Loop.findById(loop._id).populate(
      "author",
      "name userName profileImage"
    );

    return res.status(201).json(populatedLoop);
  } catch (error) {
    return res.status(500).json({ message: `UploadLoop Error ${error}!` });
  }
};

export const getAllLoops = async (req, res) => {
  try {
    const loops = await Loop.find({})
      .populate("author", "name userName profileImage")
      .populate("comments.author", "name userName profileImage")
      .sort({ createdAt: -1 });
    return res.status(200).json(loops);
  } catch (error) {
    return res.status(500).json({ message: `GetAllLoops Error ${error}!` });
  }
};

export const like = async (req, res) => {
  try {
    const loopId = req.params.loopId;
    const loop = await Loop.findById(loopId);

    if (!loop) {
      return res.status(400).json({ message: "Loop Was Not Found!" });
    }

    const alreadyLiked = loop.likes.some(
      (id) => id.toString() === req.userId.toString()
    );

    if (alreadyLiked) {
      loop.likes = loop.likes.filter(
        (id) => id.toString() !== req.userId.toString()
      );
    } else {
      loop.likes.push(req.userId);
    }

    await loop.save();
    await loop.populate("author", "name userName profileImage");

    io.emit("likedLoop", {
      loopId: loop._id,
      likes: loop.likes,
    });

    return res.status(200).json(loop);
  } catch (error) {
    return res.status(500).json({ message: `Like Loop Error ${error}!` });
  }
};

export const comments = async (req, res) => {
  try {
    const { message } = req.body;
    const loopId = req.params.loopId;
    const loop = await Loop.findById(loopId);

    if (!loop) {
      return res.status(400).json({ message: "Loop Was Not Found!" });
    }

    const comment = {
      author: req.userId,
      message,
    };

    loop.comments.push(comment);
    await loop.save();

    await loop.populate("author", "name userName profileImage");
    await loop.populate("comments.author", "name userName profileImage");

    io.emit("commentedLoop", {
      loopId: loop._id,
      comments: loop.comments,
    });

    return res.status(200).json(loop);
  } catch (error) {
    return res.status(500).json({ message: `Comment Loop Error ${error}!` });
  }
};
