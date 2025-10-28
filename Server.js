const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Job Schema
const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String
});
const Job = mongoose.model('Job', jobSchema);

// Application Schema
const applicationSchema = new mongoose.Schema({
  jobId: String,
  name: String,
  email: String,
  message: String
});
const Application = mongoose.model('Application', applicationSchema);

// Routes
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post('/api/apply', async (req, res) => {
  const application = new Application(req.body);
  await application.save();
  res.json({ message: 'Application submitted successfully!' });
});

// Health check
app.get('/', (req, res) => res.send('HLJob Connect Backend is running!'));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));