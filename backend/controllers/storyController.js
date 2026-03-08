import { Story } from "../models/Story.js";
import { cloudinary } from "../config/cloudinary.js";

export const createStory = async (req, res, next) => {
  const { title, description, author } = req.body;

  try {
    if (!title || !description || !author) {
      res.status(400);
      throw new Error("Title, description and author are required");
    }

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "womens-day-stories"
      });
      imageUrl = result.secure_url;
    }

    const story = await Story.create({
      title,
      description,
      author,
      image: imageUrl,
      user: req.user?._id
    });

    return res.status(201).json(story);
  } catch (error) {
    next(error);
  }
};

export const getStories = async (req, res, next) => {
  try {
    const stories = await Story.find({ status: "approved" }).sort({ createdAt: -1 });
    return res.json(stories);
  } catch (error) {
    next(error);
  }
};

