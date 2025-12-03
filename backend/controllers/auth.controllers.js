import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;

    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "Email Already Exists!" });
    }

    const findByUserName = await User.findOne({ userName });
    if (findByUserName) {
      return res.status(400).json({ message: "Username Already Exists!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 315360000000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Signup Error ${error}` });
  }
};

export const signIn = async (req, res) => {
  try {
    const { password, userName } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 315360000000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `SignIn Error ${error}` });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Signout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `SignOut Error ${error}` });
  }
};
