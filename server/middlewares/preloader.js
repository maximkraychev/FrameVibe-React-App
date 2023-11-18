const preload = (api, id = 'postId') => async (req, res, next) => {
		try {
			const postId = req.params[id];
			const currentState = await api(postId);

			if (currentState) {
				res.locals.preload = currentState;
				next();
			} else {
				throw new Error(`Entered ID - ${id} is invalid`, 404);
			}
		} catch (error) {
			next(error);
		}
	};

export { preload };
