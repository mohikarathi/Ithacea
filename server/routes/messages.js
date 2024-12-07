const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/", async (req, res) => {
  const { country } = req.query; 

  try {
    const messages = await Message.find({ country }).sort({ timestamp: 1 });
    res.json(messages); 
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" }); 
  }
});

router.post("/", async (req, res) => {
  const { text, user, country, timestamp } = req.body;

  try {
    const newMessage = new Message({ text, user, country, timestamp });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
