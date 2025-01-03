import React, { useState } from "react";
import "./YourProfile.css";

const YourProfile = () => {
  const initialProfile = {
    name: "John Doe",
    role: "Software Developer",
    email: "john.doe@example.com",
    phone: "+1234567890",
    about:
      "Passionate about software development and seeking new opportunities to grow.",
    skills: ["JavaScript", "React", "Node.js", "HTML/CSS", "Python"],
    experience: [
      { company: "TechCorp", position: "Frontend Developer", year: "2021-2023" },
      { company: "WebSolutions", position: "Intern", year: "2020-2021" },
    ],
    education: "Bachelor of Science in Computer Science from XYZ University",
    address: "123 Main St, Springfield, IL, 62701",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    image:
      "https://t3.ftcdn.net/jpg/03/36/94/42/240_F_336944276_tpWzmwFi6JfZln5VlfBC1BZu5jgDOAl8.jpg",
  };

  const [userProfile, setUserProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...initialProfile });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setUserProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedProfile({ ...userProfile });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {isEditing ? (
          <div className="profile-edit">
            <h2>Edit Profile</h2>
            <div className="profile-header">
              <label>Profile Picture</label>
              <img src={editedProfile.image} alt="Profile" />
              <input type="file" onChange={handleImageChange} />
            </div>
            <div className="profile-details">
              <div className="profile-detail">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-detail">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={editedProfile.role}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-detail">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-detail">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editedProfile.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-detail">
                <label>About</label>
                <textarea
                  name="about"
                  value={editedProfile.about}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-detail">
                <label>Education</label>
                <input
                  type="text"
                  name="education"
                  value={editedProfile.education}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-detail">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={editedProfile.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="profile-actions">
              <button className="save-btn" onClick={handleSaveClick}>
                Save
              </button>
              <button className="cancel-btn" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="profile-header">
              <img src={userProfile.image} alt="Profile" />
              <div>
                <h2>{userProfile.name}</h2>
                <p>{userProfile.role}</p>
              </div>
            </div>
            <div className="profile-details">
              <div className="profile-detail">
                <h3>Email</h3>
                <p>{userProfile.email}</p>
              </div>
              <div className="profile-detail">
                <h3>Phone</h3>
                <p>{userProfile.phone}</p>
              </div>
              <div className="profile-detail">
                <h3>About</h3>
                <p>{userProfile.about}</p>
              </div>
              <div className="profile-detail">
                <h3>Education</h3>
                <p>{userProfile.education}</p>
              </div>
              <div className="profile-detail">
                <h3>Address</h3>
                <p>{userProfile.address}</p>
              </div>
            </div>
            <button className="edit-btn" onClick={handleEditClick}>
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default YourProfile;
