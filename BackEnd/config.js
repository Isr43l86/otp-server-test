import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/appSafe";
export const PORT = process.env.PORT || 3000;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
export const APP_INFO_ID = process.env.APP_INFO_ID;
