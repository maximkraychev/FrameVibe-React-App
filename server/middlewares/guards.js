function isUserLogged(req, res, next) {
	if (req.user) {
		next();
	} else {
		return res.status(401).json({ message: 'Unauthorized', statusCode: 401 });
	}
}

function isUserGuest(req, res, next) {
	if (req.user) {
		return res.status(401).json({ message: 'Unauthorized', statusCode: 401 });
	} else {
		next();
	}
}

function isOwner(req, res, next) {
	if (req.user._id == res.locals.preload.owner) {
		next();
	} else {
		return res.status(403).json({ message: 'Forbidden', statusCode: 403 });
	}
}

function notOwner(req, res, next) {
	if (req.user._id == res.locals.preload.owner) {
		return res.status(403).json({ message: 'Forbidden', statusCode: 403 });
	} else {
		next();
	}
}

export {
	isUserLogged,
	isUserGuest,
	isOwner,
	notOwner
};
