const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique email
  expertise: { type: String, required: true },
  availability: { type: String, required: true },
  bio: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: Buffer },
});

module.exports = mongoose.model("Mentor", mentorSchema);
