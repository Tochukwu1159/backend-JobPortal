import Application from '../models/Application.js';

const applyToJob = async (jobId, candidateId) => {
  const existingApplication = await Application.findOne({ jobId, candidateId });
  if (existingApplication) throw new Error('Already applied');
  const application = new Application({ jobId, candidateId });
  await application.save();
  return application;
};

const getApplications = async (candidateId) => {
  return await Application.find({ candidateId }).populate('jobId');
};

const getJobApplications = async (jobId) => {
  return await Application.find({ jobId }).populate('candidateId');
};

export default { applyToJob, getApplications, getJobApplications };