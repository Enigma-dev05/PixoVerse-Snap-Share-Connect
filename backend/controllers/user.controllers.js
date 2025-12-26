import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId)
      .populate("posts")
      .populate("loops");

    if (!user) {
      return res.status(400).json({ message: "User not Found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("getCurrentUser Error:", error);
    return res
      .status(500)
      .json({ message: `Get Current User Error ${error}!` });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `Suggested User Error ${error}!` });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name, userName, bio, profession, gender } = req.body;
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    const sameUserWithUserName = await User.findOne({ userName }).select(
      "-password"
    );

    if (sameUserWithUserName && sameUserWithUserName._id != req.userId) {
      return res.status(400).json({ message: "Username Already Exists!" });
    }

    let profileImage;

    if (req.file) {
      profileImage = await uploadOnCloudinary(req.file.path);
      user.profileImage = profileImage;
    }

    user.name = name;
    user.userName = userName;
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Edit Profile Error ${error}!` });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get Profile Error ${error}!` });
  }
};
