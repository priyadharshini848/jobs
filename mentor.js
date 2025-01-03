const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const Mentor = require("./models/Mentor");  // Correct import from the model file

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// Middleware
app.use(cors(corsOptions)); // Use cors middleware once with options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer for in-memory file uploads (instead of saving to disk)
const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/jobportal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Route to handle form submission (POST request)
app.post("/api/mentors", upload.single("image"), async (req, res) => {
  try {
    const { name, email, expertise, availability, bio, location } = req.body;
    const image = req.file ? req.file.buffer : null; // Store image as Buffer if available

    const newMentor = new Mentor({
      name,
      email,
      expertise,
      availability,
      bio,
      location,
      image, // Store the image buffer
    });

    await newMentor.save();
    res.status(201).json({ message: "Mentor registered successfully!" });
  } catch (error) {
    console.error("Error saving mentor data:", error);
    res.status(500).json({ message: "Error saving mentor data", error });
  }
});

// Route to get all mentors
app.get("/api/mentors", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    const mentorData = mentors.map((mentor) => ({
      _id: mentor._id,
      name: mentor.name,
      email: mentor.email,
      expertise: mentor.expertise,
      availability: mentor.availability,
      bio: mentor.bio,
      location: mentor.location,
      image: mentor.image ? mentor.image.toString("base64") : null, // Convert image to base64
    }));
    res.json(mentorData);
  } catch (error) {
    console.error("Error retrieving mentors:", error);
    res.status(500).json({ message: "Error retrieving mentors", error });
  }
});

// Start the server
const PORT = 5002;  // Updated to 5002
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
