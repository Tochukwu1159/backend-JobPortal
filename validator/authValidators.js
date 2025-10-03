import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('candidate', 'recruiter').required(),
  profile: Joi.object({
    name: Joi.string().min(2).max(100),
    skills: Joi.array().items(Joi.string()),
    resume: Joi.string(),
    portfolioLinks: Joi.array().items(Joi.string().uri()),
    experience: Joi.number().min(0),
    location: Joi.string(),
  }).optional()
}).or('email');


export const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().required(),
}).or('email');
