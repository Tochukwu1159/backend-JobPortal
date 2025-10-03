import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load environment variables

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const secret = process.env.JWT_KEY;
    if (!secret) {
      throw new Error("JWT_KEY is not defined in environment variables");
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach user data (id, role) to request
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const authorizeRole = (role) => (req, res, next) => {

  if (!req.user || req.user.payload.role !== role) {
    return res.status(403).json({ error: `Access denied, requires ${role} role` });
  }
  next();
};

export { authenticate, authorizeRole };
