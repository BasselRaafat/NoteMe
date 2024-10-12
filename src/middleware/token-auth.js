const jwt = require("jsonwebtoken");


function tokenAuth(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader?.split(" ")[1];
	if (!token) return res.sendStatus(401);
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
		if (error) {
			next(error);
			return;
		}
		req.user = user;
		next();
	});
}

module.exports = tokenAuth;
