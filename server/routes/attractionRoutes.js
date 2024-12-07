const express = require("express");
const Attraction = require("../models/attractionModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, description, location } = req.body;

  try {
    if (!name || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAttraction = await Attraction.findOne({ name });
    if (existingAttraction) {
      return res.status(400).json({ message: "Attraction with this name already exists" });
    }

    const newAttraction = new Attraction({ name, description, location });
    await newAttraction.save();

    res.status(201).json({ message: "Attraction added successfully", attraction: newAttraction });
  } catch (error) {
    res.status(500).json({ message: "Failed to add attraction", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.status(200).json(attractions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attractions", error: error.message });
  }
});

module.exports = router;
