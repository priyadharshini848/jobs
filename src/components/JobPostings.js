import React, { useState } from 'react';
import axios from 'axios';
import './JobPostings.css'; // Import the CSS file

const JobPosting = () => {
    const [job, setJob] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        postedBy: '',
        jobType: '', // Added field for Job or Internship
        experience: '' // Added field for experience requirements
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/jobs', job);
            alert(response.data.message); // Show success alert
            setJob({ title: '', description: '', company: '', location: '', postedBy: '', jobType: '', experience: '' }); // Clear form
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Failed to post the job. Please try again.');
        }
    };

    return (
        <div className="job-posting-container">
            <h2>Post a Job or Internship</h2>
            <form onSubmit={handleSubmit} className="job-posting-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={job.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={job.description}
                    onChange={handleChange}
                    required
                ></textarea>
                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={job.company}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Job Location"
                    value={job.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="postedBy"
                    placeholder="Your Name or Email"
                    value={job.postedBy}
                    onChange={handleChange}
                    required
                />
                <select
                    name="jobType"
                    value={job.jobType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Job Type</option>
                    <option value="Job">Job</option>
                    <option value="Internship">Internship</option>
                </select>
                <input
                    type="text"
                    name="experience"
                    placeholder="Experience (e.g., 2-3 years or 'Fresher')"
                    value={job.experience}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default JobPosting;
