import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobsInternships.css';

const JobInternships = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs');
                setJobs(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError('Failed to load jobs. Please try again later.');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setShowForm(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        setFormSubmitted(true); // Show success message

        // Here you can handle form data and send it to backend if needed
        setTimeout(() => {
            alert("Job applied successfully!"); // Show alert after form submission
            setShowForm(false); // Close the form
            setFormSubmitted(false); // Reset form submission state
        }, 1000);
    };

    const closeForm = () => {
        setShowForm(false);
        setSelectedJob(null);
    };

    if (loading) {
        return <div className="loading">Loading jobs...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="job-internships">
            <h1>Job Internships</h1>
            <div className="job-grid">
                {jobs.map((job) => (
                    <div key={job._id} className="job-item">
                        <div className="job-details">
                            <h3>{job.title}</h3>
                            <p><strong>Description:</strong> {job.description}</p>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Posted By:</strong> {job.postedBy}</p>
                            <p><strong>Posted On:</strong> {new Date(job.date).toLocaleDateString()}</p>
                        </div>
                        <button
                            className="apply-btn"
                            onClick={() => handleApplyClick(job)}
                        >
                            Apply Job
                        </button>
                    </div>
                ))}
            </div>
            {showForm && (
                <div className="apply-form-container">
                    <div className="apply-form">
                        <h2>Apply for {selectedJob?.title}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                Full Name:
                                <input type="text" placeholder="Enter your full name" required />
                            </label>
                            <label>
                                Email:
                                <input type="email" placeholder="Enter your email" required />
                            </label>
                            <label>
                                Resume:
                                <input type="file" accept=".pdf,.doc,.docx" required />
                            </label>
                            <label>
                                Cover Letter:
                                <textarea placeholder="Write your cover letter" required></textarea>
                            </label>
                            <div className="form-buttons">
                                <button type="submit" className="submit-btn">Submit</button>
                                <button type="button" className="cancel-btn" onClick={closeForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {formSubmitted && !showForm && (
                <div className="form-success-message">
                    Job application submitted successfully!
                </div>
            )}
        </div>
    );
};

export default JobInternships;
