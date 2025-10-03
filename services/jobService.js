import User from '../models/User.js';
import Job from '../models/Job.js';

const createJob = async (jobData, recruiterId) => {
  const job = new Job({ ...jobData, postedBy: recruiterId });
  await job.save();
  return job;
};

const getJobs = async (filters = {}) => {
  return await Job.find(filters).populate('postedBy', 'profile.name');
};

const searchCandidates = async (skills, experience, location) => {
  const query = {};
  if (skills) query['profile.skills'] = { $in: skills };
  if (experience) query['profile.experience'] = { $gte: experience };
  if (location) query['profile.location'] = location;
  return await User.find({ role: 'candidate', ...query });
};

export default { createJob, getJobs, searchCandidates };
