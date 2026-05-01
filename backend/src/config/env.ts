import dotenv from 'dotenv';

dotenv.config()
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const env = {
    DATABASE_URL : process.env.DATABASE_URL,
    JWT_SECRET : process.env.JWT_SECRET
}