export default () => (req, res, next) => {
    // Here we can add which host can use our server
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS, HEAD'
	);
	
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With, Content-Type, X-Authorization'
	);

	 // Allow credentials (cookies)
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	next();
};
