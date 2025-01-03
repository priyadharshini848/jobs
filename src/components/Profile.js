import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const initialProfile = {
    name: "Jane Doe",
    role: "Graphic Designer",
    email: "jane.doe@example.com",
    phone: "+9876543210",
    about: "Creative and passionate about designing engaging visual content.",
    skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Sketch", "Figma"],
    experience: [
      { company: "Creative Agency", position: "Lead Designer", year: "2020-2023" },
      { company: "Design Studio", position: "Junior Designer", year: "2018-2020" },
    ],
    education: "Bachelor of Arts in Graphic Design from ABC University",
    address: "456 Elm St, Downtown, NY, 10001",
    hobbies: ["Photography", "Traveling", "Reading", "Sketching"],
    achievements: [
      "Won 'Best Designer Award' at Creative Summit 2021",
      "Designed branding for 50+ successful projects",
    ],
    certifications: ["Certified UX Designer", "Advanced Photoshop Certification"],
    projects: [
      { title: "E-Commerce Website Design", year: "2022" },
      { title: "Mobile App UI/UX Design", year: "2021" },
    ],
    profileImage: "https://st4.depositphotos.com/1000816/20208/i/380/depositphotos_202082830-stock-photo-successful-business-woman-standing-in.jpg", // Default profile picture
  };

  const [userProfile, setUserProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...initialProfile });
  const [uploadedImage, setUploadedImage] = useState(initialProfile.profileImage);

  // Handle editing mode
  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    setUserProfile({ ...editedProfile, profileImage: uploadedImage });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedProfile({ ...userProfile });
    setUploadedImage(userProfile.profileImage);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {isEditing ? (
          <div className="profile-edit">
            <h2>Edit Profile</h2>
            <div className="profile-detail">
              <label>Profile Picture</label>
              <div className="image-preview">
                {uploadedImage && <img src={uploadedImage} alt="Profile" />}
              </div>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            </div>
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
              <label>About</label>
              <textarea
                name="about"
                value={editedProfile.about}
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
              <label>Address</label>
              <textarea
                name="address"
                value={editedProfile.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-actions">
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-view">
            <div className="profile-header">
              {userProfile.profileImage && (
                <img src={userProfile.profileImage} alt="Profile" />
              )}
              <div>
                <h2>{userProfile.name}</h2>
                <p>{userProfile.role}</p>
              </div>
            </div>
            <div className="profile-detail">
              <h3>About</h3>
              <p>{userProfile.about}</p>
            </div>
            <div className="profile-detail">
              <h3>Email</h3>
              <p>{userProfile.email}</p>
            </div>
            <div className="profile-detail">
              <h3>Phone</h3>
              <p>{userProfile.phone}</p>
            </div>
            <div className="profile-detail">
              <h3>Address</h3>
              <p>{userProfile.address}</p>
            </div>
            <div className="profile-detail">
              <h3>Achievements</h3>
              <ul>
                {userProfile.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
            <div className="profile-detail">
              <h3>Certifications</h3>
              <ul>
                {userProfile.certifications.map((certification, index) => (
                  <li key={index}>{certification}</li>
                ))}
              </ul>
            </div>
            <div className="profile-detail">
              <h3>Projects</h3>
              <ul>
                {userProfile.projects.map((project, index) => (
                  <li key={index}>
                    <strong>{project.title}</strong> ({project.year})
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleEditClick}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
