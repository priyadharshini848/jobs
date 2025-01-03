import React, { useState } from "react";
import "./JobApplicationForm.css";

const JobApplicationForm = ({ job }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application Submitted:", formData);
    alert(`Your application for ${job.title} at ${job.company} has been submitted!`);
  };

  return (
    <div className="job-application-form">
      <h3>Apply for {job.title} at {job.company}</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your Email"
          required
        />
        <label>Cover Letter:</label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          placeholder="Your Cover Letter"
          required
        ></textarea>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
