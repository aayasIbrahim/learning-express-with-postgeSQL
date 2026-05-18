import dotenv from "dotenv";
import path from "path";
import type { SignOptions } from 'jsonwebtoken';
dotenv.config({
  path: path.join(process.cwd(), ".env"), // ফাইলের লোকেশন
});

const config = {
  connection_string: process.env.CONNECTIONSTRING as string,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  node_env: process.env.NODE_ENV,
 access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'],
  refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'],
};
export default config;
