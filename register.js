const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5003;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/jobportal";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema and Model for User Registration
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String, required: true },
  mobile: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.post("/api/register", async (req, res) => {
    const { name, email, password, mobile } = req.body;
  
    // Check if the email format is valid
    const emailPattern = /^\d{4}et\d{4}@maatram\.ac\.in$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
  
    try {
      // Check if the email or mobile already exists
      const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
      if (existingUser) {
        return res.status(409).json({
          message: "Email or mobile number already registered. Please use a different one.",
        });
      }
  
      // Save new user
      const newUser = new User({ name, email, password, mobile });
      await newUser.save();
      res.status(201).json({ message: "Registration successful" });
    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).json({ message: "Error during registration", error: err.message });
    }
  });
  
  
  
// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
