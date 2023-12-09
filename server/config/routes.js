import { postController } from '../controllers/postController.js';
import { userController } from '../controllers/userController.js';
import logRequests from '../middlewares/displayRequest.js';

export default (app) => {
	app.use(logRequests()); // Logging every request
	app.use('/post', postController);
	app.use('/users', userController);
	app.all('*', (req, res, next) => {
		try {
			throw new Error(`No content - path ${req.path} of method ${req.method} not found`);
		} catch (error) {
			error.statusCode = 404;
			next(error);
		}
	});
};
