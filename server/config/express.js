import { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from '../middlewares/cors.js';
import userSession from '../middlewares/userSession.js';
import { trimBody } from '../middlewares/trimBody.js';

export default (app) => {
	app.use(cors());
	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(cookieParser()); 			
	app.use(userSession());
	app.use(trimBody());
};
