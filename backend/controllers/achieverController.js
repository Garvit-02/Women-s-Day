import { Achiever } from "../models/Achiever.js";

export const getAchievers = async (req, res, next) => {
  try {
    const achievers = await Achiever.find().sort({ createdAt: -1 });
    return res.json(achievers);
  } catch (error) {
    next(error);
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
    next(error);
  }
};

