import { connect } from 'mongoose';
import dotenv from 'dotenv';

// Configure dotenv library
dotenv.config();

// Get environment variable for connection string
const CONNECTION_STRING_MONGODB = process.env.CONNECTION_STRING_MONGODB;

export default async () => {
	try {
		await connect(CONNECTION_STRING_MONGODB);
		console.log('Database successfully connected');
	} catch (error) {
		console.error('Error initializing database');
		console.error(error.message);
		process.exit(1);
	}
};
