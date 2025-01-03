const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // Allow CORS for frontend requests

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/jobportal", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define a schema for alumni login
const alumniSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Create a model based on the schema
const Alumni = mongoose.model("Alumni", alumniSchema);

app.post("/api/alumni-login", async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Backend - Received Email:", email); // Log the received email
    console.log("Backend - Received Password:", password); // Log the received password
  
    // Validate the email format (2016-2024, et/as, 0001-0100)
    const emailPattern = /^(2016|2017|2018|2019|2020|2021|2022|2023|2024)(et|as)\d{4}@maatram\.ac\.in$/;
    if (!email.match(emailPattern)) {
      console.log("Email format is invalid.");
      return res.json({ success: false, message: "Invalid email format." });
    }
  
    // Check if the password matches the first 10 characters of the email
    const expectedPassword = email.substring(0, 10);
    if (password !== expectedPassword) {
      console.log("Password mismatch:", password, "Expected:", expectedPassword);
      return res.json({ success: false, message: "Invalid password." });
    }
  
    // Find alumni by email in the database
    try {
      const alumni = await Alumni.findOne({ email });
      if (alumni) {
        console.log("Backend - Login successful for:", email); // Log successful login
        return res.json({ success: true });
      } else {
        console.log("Backend - Email not found in the database.");
        return res.json({ success: false, message: "Email not registered." });
      }
    } catch (err) {
      console.log("Backend - Error occurred while processing login:", err);
      return res.json({ success: false, message: "An error occurred. Please try again later." });
    }
  });
  
  
  
// Start the server
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
