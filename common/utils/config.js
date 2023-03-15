import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

//process.env

export const MONGO_URI = process.env.MONGO_URI;
export const SECRET = process.env.SECRET;
export const BASE_URL = process.env.BASE_URL;
