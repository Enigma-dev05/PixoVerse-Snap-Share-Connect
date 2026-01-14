import uploadOnCloudinary from "../config/cloudinary.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { getSocketId, io } from "../socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.receiverId;
    const { message } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message,
      image,
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: `SendMessage Error ${error}!` });
  }
};

export const getAllMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.receiverId;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    res.status(200).json(conversation?.messages || []);
  } catch (error) {
    res.status(500).json({ message: `GetAllMessage Error ${error}!` });
  }
};

export const getPrevUserChats = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const conversations = await Conversation.find({
      participants: { $in: [currentUserId] },
    })
      .populate("participants", "username profileImage name")
      .populate({
        path: "messages",
        options: { sort: { createdAt: 1 } },
      })
      .sort({ updatedAt: -1 });

    const userMap = {};

    conversations.forEach((conv) => {
      const lastMsg =
        conv.messages.length > 0
          ? conv.messages[conv.messages.length - 1]
          : null;

      conv.participants.forEach((user) => {
        if (user._id.toString() !== currentUserId) {
          userMap[user._id] = {
            ...user.toObject(),
            lastMessage: lastMsg,
            updatedAt: conv.updatedAt,
          };
        }
      });
    });

    res.status(200).json(Object.values(userMap));
  } catch (error) {
    console.error("GetPrevUserChats Error:", error);
    res.status(500).json({ message: "Failed to fetch previous chats" });
  }
};
