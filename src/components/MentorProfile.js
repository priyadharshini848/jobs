import React from "react";
import { useParams } from "react-router-dom";
import "./MentorProfile.css";

const MentorProfile = ({ mentorsList }) => {
  const { mentorName } = useParams();
  const mentor = mentorsList.find((m) => m.name === mentorName);

  if (!mentor) {
    return <div>Mentor not found!</div>;
  }

  return (
    <div className="mentor-profile-container">
      <div className="mentor-details-section">
        <img src={mentor.image} alt={mentor.name} className="mentor-profile-picture" />
        <h1>{mentor.name}</h1>
        <p><strong>Expertise:</strong> {mentor.expertise}</p>
        <p><strong>Location:</strong> {mentor.location}</p>
        <p><strong>Availability:</strong> {mentor.availability}</p>
        <p><strong>Contact Email:</strong> <a href={`mailto:${mentor.contact}`}>{mentor.contact}</a></p>
        {mentor.social && (
          <p>
            <strong>Social Profiles:</strong>{" "}
            <a href={mentor.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        )}
      </div>

      <div className="about-mentor-section">
        <h2>About {mentor.name}</h2>
        <p>{mentor.bio}</p>
      </div>

      <div className="skills-services-section">
        <h2>Skills and Services</h2>
        <ul>
          {mentor.skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        {mentor.services && (
          <p><strong>Services Offered:</strong> {mentor.services}</p>
        )}
      </div>

      <div className="testimonials-section">
        <h2>Testimonials</h2>
        {mentor.testimonials && mentor.testimonials.length > 0 ? (
          mentor.testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <p>{testimonial.feedback}</p>
              <span>- {testimonial.name}</span>
            </div>
          ))
        ) : (
          <p>No testimonials available yet.</p>
        )}
      </div>
    </div>
  );
};

export default MentorProfile;
