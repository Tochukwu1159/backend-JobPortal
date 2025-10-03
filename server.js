import express, { urlencoded, json } from "express";
import fileUpload  from 'express-fileupload';
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoute.js';

import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';



dotenv.config();
const app = express();

app.use(fileUpload());

app.use(cors());
app.use(morgan('combined'));
app.use(urlencoded({ extended: true, limit: "50mb" }));
app.use(json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications',applicationRoutes);



app.get("/", (req, res) => {
  res.send({
    message: "Hi, welcome to Job Seeker API service",
  });
});

export default app;
