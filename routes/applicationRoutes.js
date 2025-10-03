import express from 'express';
const router = express.Router();
import applicationController from  '../controllers/applicationController.js';
import { authenticate, authorizeRole }  from '../helpers/authHelper.js';

router.post('/', authenticate, authorizeRole('candidate'), applicationController.applyToJob);
router.get('/', authenticate, authorizeRole('candidate'), applicationController.getApplications);
router.get('/:jobId', authenticate, authorizeRole('recruiter'), applicationController.getJobApplications);

export default  router;