const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/jobportal";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Job Schema and Model
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    postedBy: { type: String, required: true }, // User who posted the job
    date: { type: Date, default: Date.now }
});

const Job = mongoose.model('work', jobSchema); // Collection name is 'work'

// API Route to Post a Job
app.post('/api/jobs', async (req, res) => {
    try {
        const jobData = req.body;
        console.log("Received job data:", jobData);  // Log the received data

        const newJob = new Job(jobData);
        const savedJob = await newJob.save();
        console.log("Saved job:", savedJob);  // Log the saved job document

        res.status(201).json({ message: 'Job posted successfully!', job: savedJob });
    } catch (err) {
        console.error("Error posting job:", err);  // Log the error message
        res.status(500).json({ message: 'Error posting job', error: err.message });
    }
});


// API Route to Fetch All Jobs (optional)
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching jobs', error: err.message });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});