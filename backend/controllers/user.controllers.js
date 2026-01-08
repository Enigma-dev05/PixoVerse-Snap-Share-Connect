import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId)
      .populate("posts")
      .populate("loops")
      .populate("following", "userName profileImage");

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
    const user = await User.findOne({ userName })
      .select("-password")
      .populate("posts")
      .populate("loops")
      .populate("followers", "userName profileImage name")
      .populate("following", "userName profileImage name");

    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get Profile Error ${error}!` });
  }
};

export const follow = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const targetUserId = req.params.targetUserId;

    if (!targetUserId) {
      return res.status(400).json({ message: "Target User Not Found!" });
    }

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You Cannot Follow Yourself!" });
    }

    const currentUser = await User.findById(currentUserId).select("-password");
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    const isFollowing = currentUser.following.some(
      (id) => id.toString() === targetUserId.toString()
    );

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId.toString()
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId.toString()
      );
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    await currentUser.populate("following", "userName profileImage");

    return res.status(200).json(currentUser);
  } catch (error) {
    return res.status(500).json({ message: `Follow Error ${error}!` });
  }
};
