import React, { useEffect, useState } from "react";
import "./FindMentor.css";

const FindMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/mentors");
        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
        setError(error.message);
      }
    };

    fetchMentors();
  }, []);

  // Function to handle the "Choose" button click
  const handleChoose = (name) => {
    alert(`You chose ${name}`);
  };

  return (
    <div className="find-mentor-container">
      <h2>Find a Mentor</h2>
      {error && <p className="error">{error}</p>}
      <div className="mentor-cards">
        {mentors.length === 0 ? (
          <p>No mentors available</p>
        ) : (
          mentors.map((mentor) => (
            <div className="mentor-card" key={mentor._id}>
              <div className="mentor-image">
                {mentor.image ? (
                  <img
                    src={`data:image/jpeg;base64,${mentor.image}`}
                    alt={mentor.name}
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
              </div>
              <div className="mentor-info">
                <h3>{mentor.name}</h3>
                <p><strong>Email:</strong> {mentor.email}</p>
                <p><strong>Expertise:</strong> {mentor.expertise}</p>
                <p><strong>Availability:</strong> {mentor.availability} hours/week</p>
                <p><strong>Location:</strong> {mentor.location}</p>
                <p><strong>Bio:</strong> {mentor.bio}</p>
                {/* "Choose" button to trigger the alert */}
                <button onClick={() => handleChoose(mentor.name)}>Choose</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FindMentor;
