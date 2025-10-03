import jobService from '../services/jobService.js';

const createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body, req.user.payload.userId);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await jobService.getJobs(req.query);
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchCandidates = async (req, res) => {
  try {
    const candidates = await jobService.searchCandidates(req.query.skills, req.query.experience, req.query.location);
    res.json(candidates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export default { createJob, getJobs, searchCandidates  };
