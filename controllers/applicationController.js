import applicationService from  '../services/applicationService.js';
const applyToJob = async (req, res) => {
  try {
    const application = await applicationService.applyToJob(req.body.jobId, req.user.payload.userId);
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await applicationService.getApplications(req.user.payload.userId);
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const applications = await applicationService.getJobApplications(req.params.jobId);
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { applyToJob, getApplications, getJobApplications };
