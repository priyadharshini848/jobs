import React, { useState } from "react";
import "./MentorshipProgram.css";

const MentorshipProgram = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    availability: "",
    bio: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("expertise", formData.expertise);
    formDataToSend.append("availability", formData.availability);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("location", formData.location);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
  
    try {
      const response = await fetch("http://localhost:5002/api/mentors", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (response.ok) {
        alert("Thank you for signing up as a mentor!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred. Please try again later.");
    }
  };
  
  

  return (
    <div className="mentorship-container">
      <h2>Become a Mentor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="expertise"
          placeholder="Expertise"
          value={formData.expertise}
          onChange={handleChange}
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability (hours/week)"
          value={formData.availability}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MentorshipProgram;