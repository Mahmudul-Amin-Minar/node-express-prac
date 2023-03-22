import { config } from "dotenv";

config();

export const DOMAIN = process.env.APP_DOMAIN
export const SECRET = process.env.APP_SECRET
export const PORT = process.env.PORT || process.env.APP_PORT
export const DB = process.env.APP_DB
export const SENDGRID_API = process.env.SENDGRID_API
export const APP_HOST_EMAIL = process.env.APP_HOST_EMAIL