import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;
const Redis_URL = process.env.Redis_URL;
const JWT_SECRET = process.env.JWT_SECRET
const EMAIL_HOST=process.env.EMAIL_HOST
const EMAIL_PORT=process.env.EMAIL_PORT
const EMAIL_USER=process.env.EMAIL_USER
const EMAIL_PASS=process.env.EMAIL_PASS
const EMAIL_FROM=process.env.EMAIL_FROM
const FRONTEND_URL=process.env.FRONTEND_URL

export const environment = {
  PORT,
  DB_URL,
  PORT,
  JWT_SECRET,
  Redis_URL,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM,
  FRONTEND_URL
};