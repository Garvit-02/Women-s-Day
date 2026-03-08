import { Achiever } from "../models/Achiever.js";
import { Story } from "../models/Story.js";
import { User } from "../models/User.js";

export const seedSampleData = async () => {
  const achieversCount = await Achiever.countDocuments();
  if (achieversCount === 0) {
    await Achiever.insertMany([
      {
        name: "Malala Yousafzai",
        field: "Education Activism",
        bio: "Pakistani activist for female education and the youngest Nobel Prize laureate.",
        image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
      },
      {
        name: "Marie Curie",
        field: "Science",
        bio: "Pioneering physicist and chemist who conducted groundbreaking research on radioactivity.",
        image: "https://images.pexels.com/photos/3735704/pexels-photo-3735704.jpeg"
      }
    ]);
  }

  const storiesCount = await Story.countDocuments();
  if (storiesCount === 0) {
    await Story.insertMany([
      {
        title: "My Grandmother, My Hero",
        description:
          "My grandmother raised five children while working full-time. Her resilience and kindness inspire me every day.",
        author: "Anonymous",
        image: "",
        status: "approved",
        createdAt: new Date()
      }
    ]);
  }

  const adminCount = await User.countDocuments({ role: "admin" });
  if (adminCount === 0) {
    await User.create({
      name: "Admin",
      email: "admin@womensday.com",
      password: "Admin@123",
      role: "admin"
    });
  }
};

