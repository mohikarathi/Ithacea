const express = require("express");
const Challenge = require("../models/challengeModel");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig"); // Cloudinary config

const router = express.Router();

// Set up multer to use Cloudinary as the storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "challenges", // Cloudinary folder
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// POST route to add new challenge with image
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, points } = req.body;

  try {
    if (!title || !description || !points) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingChallenge = await Challenge.findOne({ title });
    if (existingChallenge) {
      return res.status(400).json({ message: "Challenge with this title already exists" });
    }

    const imageUrl = req.file ? req.file.path : null; // Store the uploaded image URL

    const newChallenge = new Challenge({
      title,
      description,
      points,
      imageUrl, // Add the image URL to the new challenge
    });

    await newChallenge.save();

    res.status(201).json({ message: "Challenge added successfully", challenge: newChallenge });
  } catch (error) {
    res.status(500).json({ message: "Failed to add challenge", error: error.message });
  }
});

// GET route to fetch all challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch challenges", error: error.message });
  }
});

module.exports = router;
