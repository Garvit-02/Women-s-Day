import { SafetyLocation } from "../models/SafetyLocation.js";

export const getSafetyLocations = async (req, res, next) => {
  try {
    const locations = await SafetyLocation.find().sort({ createdAt: -1 });
    return res.json(locations);
  } catch (error) {
    return next(error);
  }
};

export const createSafetyLocation = async (req, res, next) => {
  const { name, type, latitude, longitude, description } = req.body || {};

  try {
    if (!name || !type || latitude === undefined || longitude === undefined) {
      res.status(400);
      throw new Error("Name, type, latitude, and longitude are required");
    }

    const latNum = Number(latitude);
    const lngNum = Number(longitude);

    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
      res.status(400);
      throw new Error("Latitude and longitude must be numeric values");
    }

    const location = await SafetyLocation.create({
      name,
      type,
      latitude: latNum,
      longitude: lngNum,
      description: description || "",
      createdBy: req.user?._id || null
    });

    return res.status(201).json(location);
  } catch (error) {
    return next(error);
  }
};

