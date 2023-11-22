import jwt from 'jsonwebtoken';
import { tokenBlackList } from '../util/tokenBlackList.js';

export default () => (req, res, next) => {

	let userToken = null;

	// The token is saved as two cookies on the client
	// Concatenate the two cookie into one
	const tokenHeaderPayload = req.cookies.jwtHeaderPayload;
	const tokenSignature = req.cookies.jwtSignature;

	if (tokenHeaderPayload && tokenSignature) tokenHeaderPayload.concat('.', tokenSignature);

	// If we have userToken save it into req
	if (userToken) {
		try {
			if (tokenBlackList.has(userToken)) {
				throw new Error('The token has already been used. Please sign in again.');
			}

			const decodedToken = jwt.verify(
				userToken,
				process.env.JWT_SECRET,
				(err, decodedToken) => {
					if (err) {
						throw new Error('The token is invalid. Please sign in again.');
					}

					return decodedToken;
				}
			);

			req.user = decodedToken;
			req.userToken = userToken;
		} catch (error) {
			// Add status code and invoke global error handler
			error.statusCode = 401;
			return next(error);
		}
	}

	next();
};
