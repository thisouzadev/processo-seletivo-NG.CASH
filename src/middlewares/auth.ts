import { Request, Response, NextFunction } from "express"
require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: process.env.JWT_ALGORITHM || 'HS256',
};

const SECRET = process.env.JWT_SECRET || 'secret_key';

export const createToken = (payload: any) => jwt.sign(payload, SECRET, jwtConfig);

const validate = (token: any) => jwt.verify(token, SECRET);

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const Payload = validate(authorization);
    req.user = Payload.payload
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};