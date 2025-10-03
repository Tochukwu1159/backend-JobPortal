import express from 'express';
const router = express.Router();
import jobController from '../controllers/jobController.js';
import { authenticate, authorizeRole } from '../helpers/authHelper.js';

router.post('/', authenticate, authorizeRole('recruiter'), jobController.createJob);
router.get('/', jobController.getJobs);
router.get('/search-candidates', authenticate, authorizeRole('recruiter'), jobController.searchCandidates);

export default router;