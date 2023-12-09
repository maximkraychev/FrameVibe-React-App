import express from 'express';
import dotenv from 'dotenv';

import databaseConfig from './config/database.js';
import expressConfig from './config/express.js';
import routesConfig from './config/routes.js';
import { cloudinaryConfig } from './config/cloudinary.js';
import globalErrorHandling from './util/globalErrorHandler.js';

dotenv.config();
const PORT = process.env.PORT;

export default async function start() {
	const app = express();

	await databaseConfig();
	expressConfig(app);
	routesConfig(app);
	cloudinaryConfig();
	app.use(globalErrorHandling);

	app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}...`));
}

start();