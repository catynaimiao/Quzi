//this config is for backend
import * as dotenv from "dotenv";
dotenv.config();

//dotenv
//process.env
export const MONGO_URI = process.env.MONGO_URI;
export const SECRET = process.env.SECRET;
export const BASE_URL = process.env.BASE_URL;

//dev

//customize