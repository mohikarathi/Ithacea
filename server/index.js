const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinaryConfig");
const Message = require("./models/Message");
const User = require("./models/userModel");
const Challenge = require("./models/challengeModel");
const { check, validationResult } = require("express-validator");


const app = express();

// Create HTTP server for both Express and socket.io to work together
const server = http.createServer(app);

// Initialize socket.io with the server
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this based on your frontend server
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/NullPointer")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Set up multer to use Cloudinary as the storage engine with validation
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "challenges",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image file."), false);
    }
  },
});

// Fetch messages by country
app.get("/api/messages", async (req, res) => {
  const { country } = req.query;

  try {
    const messages = await Message.find({ country }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Post a new message
app.post("/api/messages", async (req, res) => {
  const { text, user, country, timestamp } = req.body;

  try {
    const newMessage = new Message({ text, user, country, timestamp });
    await newMessage.save();
    io.emit("newMessage", newMessage); // Emit message to all clients
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error posting message", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});


// Register user endpoint with validation
app.post(
  "/api/users/register",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password should be at least 6 characters").isLength({ min: 6 }),
    check("username", "Username is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword, username });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user", error);
      res.status(500).json({ message: "Registration failed" });
    }
  }
);

// Login user endpoint with JWT

app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json({ message: "Login failed" });
  }
});


// Add new challenge with an image (with multer error handling)
app.post(
  "/api/challenges",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Multer error: ${err.message}` });
      } else if (err) {
        return res.status(500).json({ message: `Upload error: ${err.message}` });
      }
      next();
    });
  },
  async (req, res) => {
    const { title, description, points } = req.body;

    try {
      if (!title || !description || !points) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingChallenge = await Challenge.findOne({ title });
      if (existingChallenge) {
        return res.status(400).json({ message: "Challenge with this title already exists" });
      }

      const imageUrl = req.file ? req.file.path : null;
      const newChallenge = new Challenge({ title, description, points, imageUrl });
      await newChallenge.save();

      res.status(201).json({ message: "Challenge added successfully", challenge: newChallenge });
    } catch (error) {
      console.error("Error adding challenge", error);
      res.status(500).json({ message: "Failed to add challenge", error: error.message });
    }
  }
);


// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);


  socket.on("login", async (data, callback) => {
    const { email, password } = data;

    try {

      const user = await User.findOne({ email });

      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1h" });
        callback({ success: true, message: "Login successful", token });
      } else {
        callback({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      callback({ success: false, message: "Login failed due to server error" });
    }
  });

  // Listening for new message event from clients
  socket.on("sendMessage", async (messageData) => {
    try {
      const { text, user, country, timestamp } = messageData;
      const newMessage = new Message({ text, user, country, timestamp });
      await newMessage.save();
      io.emit("newMessage", newMessage);
    } catch (err) {
      console.error("Error saving message", err);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//sentence
