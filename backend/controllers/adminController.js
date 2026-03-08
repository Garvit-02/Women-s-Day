import { User } from "../models/User.js";
import { Story } from "../models/Story.js";
import { Achiever } from "../models/Achiever.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

export const getAllStories = async (req, res, next) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    return res.json(stories);
  } catch (error) {
    return next(error);
  }
};

export const deleteStory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const story = await Story.findById(id);
    if (!story) {
      res.status(404);
      throw new Error("Story not found");
    }

    await story.deleteOne();
    return res.json({ message: "Story deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

export const approveStory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const story = await Story.findById(id);
    if (!story) {
      res.status(404);
      throw new Error("Story not found");
    }

    story.status = "approved";
    await story.save();

    return res.json(story);
  } catch (error) {
    return next(error);
  }
};

export const createAchiever = async (req, res, next) => {
  const { name, field, bio, image } = req.body;

  try {
    if (!name || !field || !bio) {
      res.status(400);
      throw new Error("Name, field and bio are required");
    }

    const achiever = await Achiever.create({
      name,
      field,
      bio,
      image: image || ""
    });

    return res.status(201).json(achiever);
  } catch (error) {
    return next(error);
  }
};

export const deleteAchiever = async (req, res, next) => {
  const { id } = req.params;

  try {
    const achiever = await Achiever.findById(id);
    if (!achiever) {
      res.status(404);
      throw new Error("Achiever not found");
    }

    await achiever.deleteOne();
    return res.json({ message: "Achiever deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

