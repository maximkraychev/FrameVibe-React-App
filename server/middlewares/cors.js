export default () => (req, res, next) => {
    // Here we can add which host can use our server
	res.setHeader('Access-Control-Allow-Origin', 'https://frame-vibe-react-app.vercel.app');

	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD'
	);
	
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With, Content-Type, X-Authorization'
	);

	 // Allow credentials (cookies)
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	next();
};
