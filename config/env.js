import { config } from "dotenv";
config();    // This will load the .env file in the root directory of the project;
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });    // This will load the .env file in the root directory of the project;

export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
