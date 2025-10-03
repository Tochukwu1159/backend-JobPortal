import Application from '../models/Application.js';
import Job from '../models/Job';

const getCandidateAnalysis = async (candidateId) => {
  const applications = await Application.find({ candidateId }).populate('jobId');
  const totalApplications = applications.length;
  const accepted = applications.filter(app => app.status === 'accepted').length;
  const successRate = totalApplications ? (accepted / totalApplications) * 100 : 0;

  const skillsApplied = [...new Set(applications.flatMap(app => app.jobId.skillsRequired))];
  return { totalApplications, accepted, successRate, skillsApplied };
};

const getRecruiterAnalysis = async (recruiterId) => {
  const jobs = await Job.find({ postedBy: recruiterId });
  const applications = await Application.find({ jobId: { $in: jobs.map(j => j._id) } }).populate('candidateId');
  const totalApplications = applications.length;
  const skillMatches = applications.filter(app => {
    const jobSkills = jobs.find(j => j._id.equals(app.jobId)).skillsRequired;
    return jobSkills.every(skill => app.candidateId.profile.skills.includes(skill));
  }).length;

  return { totalJobs: jobs.length, totalApplications, skillMatchRate: totalApplications ? (skillMatches / totalApplications) * 100 : 0 };
};

export default { getCandidateAnalysis, getRecruiterAnalysis }