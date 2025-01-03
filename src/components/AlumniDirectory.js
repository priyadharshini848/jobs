import React, { useState, useEffect } from "react";
import "./AlumniDirectory.css";

const initialAlumniData = [
  { name: "John Doe", batch: "2020", experience: "Software Engineer at XYZ Corp", image: "https://st2.depositphotos.com/2931363/6569/i/380/depositphotos_65699901-stock-photo-black-man-keeping-arms-crossed.jpg", currentRole: "Full-stack Developer", email: "johndoe@gmail.com" },
  { name: "Jane Smith", batch: "2021", experience: "Marketing Manager at ABC Ltd.", image: "https://st2.depositphotos.com/1662991/43758/i/380/depositphotos_437580158-stock-photo-happy-hispanic-young-guy-his.jpg", currentRole: "Brand Strategist", email: "janesmith@gmail.com" },
];

const AlumniDirectory = () => {
  const [search, setSearch] = useState("");
  const [alumniData, setAlumniData] = useState(() => {
    // Retrieve from localStorage if available
    const savedData = localStorage.getItem("alumniData");
    return savedData ? JSON.parse(savedData) : initialAlumniData;
  });
  const [filteredAlumni, setFilteredAlumni] = useState(alumniData);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newAlumni, setNewAlumni] = useState({
    name: "",
    batch: "",
    experience: "",
    image: "",
    currentRole: "",
    email: "",
  });

  useEffect(() => {
    // Save alumni data to localStorage whenever it changes
    localStorage.setItem("alumniData", JSON.stringify(alumniData));
  }, [alumniData]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = alumniData.filter(
      (alumni) =>
        alumni.name.toLowerCase().includes(value.toLowerCase()) ||
        alumni.batch.includes(value)
    );
    setFilteredAlumni(filtered);
  };

  const handleChoose = (alumni) => {
    setSelectedAlumni(alumni);
  };

  const handleCloseDetails = () => {
    setSelectedAlumni(null);
  };

  const handleRequest = () => {
    alert(`Request sent to ${selectedAlumni.name}!`);
  };

  const handleOpenAddForm = () => {
    setIsAdding(true);
  };

  const handleCloseAddForm = () => {
    setIsAdding(false);
    setNewAlumni({
      name: "",
      batch: "",
      experience: "",
      image: "",
      currentRole: "",
      email: "",
    });
  };

  const handleAddAlumni = () => {
    // Validation: Check if all fields are filled
    if (
      !newAlumni.name ||
      !newAlumni.batch ||
      !newAlumni.experience ||
      !newAlumni.image ||
      !newAlumni.currentRole ||
      !newAlumni.email
    ) {
      alert("Please fill in all fields before adding!");
      return;
    }

    setAlumniData([...alumniData, newAlumni]);
    setFilteredAlumni([...filteredAlumni, newAlumni]);
    handleCloseAddForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlumni({ ...newAlumni, [name]: value });
  };

  return (
    <div className="alumni-directory">
      <h2>Alumni Directory</h2>
      <p>Connect with fellow alumni and students.</p>
      <input
        type="text"
        placeholder="Search by name or batch"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="alumni-list">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map((alumni, index) => (
            <div key={index} className="alumni-item">
              <div className="alumni-image">
                <img src={alumni.image} alt={alumni.name} />
              </div>
              <div className="alumni-details">
                <p><strong>Name:</strong> {alumni.name}</p>
                <p><strong>Batch:</strong> {alumni.batch}</p>
                <p><strong>Experience:</strong> {alumni.experience}</p>
                <p><strong>Current Role:</strong> {alumni.currentRole}</p>
                <p><strong>Email:</strong> {alumni.email}</p>
              </div>
              <button className="choose-btn" onClick={() => handleChoose(alumni)}>
                Choose
              </button>
            </div>
          ))
        ) : (
          <p>No alumni found</p>
        )}
      </div>

      {selectedAlumni && (
        <div className="selected-alumni-details">
          <div className="details-header">
            <h3>Selected Alumni</h3>
            <button onClick={handleCloseDetails} className="close-btn">×</button>
          </div>
          <div className="details-content">
            <img src={selectedAlumni.image} alt={selectedAlumni.name} />
            <p><strong>Name:</strong> {selectedAlumni.name}</p>
            <p><strong>Batch:</strong> {selectedAlumni.batch}</p>
            <p><strong>Experience:</strong> {selectedAlumni.experience}</p>
            <p><strong>Current Role:</strong> {selectedAlumni.currentRole}</p>
            <p><strong>Email:</strong> {selectedAlumni.email}</p>
            <button className="request-btn" onClick={handleRequest}>
              Request
            </button>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="add-alumni-form">
          <h3>Add New Alumni</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newAlumni.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="batch"
            placeholder="Batch"
            value={newAlumni.batch}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={newAlumni.experience}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newAlumni.image}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="currentRole"
            placeholder="Current Role"
            value={newAlumni.currentRole}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newAlumni.email}
            onChange={handleInputChange}
          />
          <button onClick={handleAddAlumni} className="add-btn">Add Alumni</button>
          <button onClick={handleCloseAddForm} className="cancel-btn">Cancel</button>
        </div>
      )}

      <button className="add-alumni-btn" onClick={handleOpenAddForm}>
        +
      </button>
    </div>
  );
};

export default AlumniDirectory;
