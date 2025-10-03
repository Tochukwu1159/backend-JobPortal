import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: [String],
  location: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
});


const Job = mongoose.model('Job', jobSchema);

export default Job;