class Auth {
	constructor() {
	}

	isValid(req, res, next) {
		if (req.headers.identity === "lsa") {
			next();
			return true;
		}
		else {
			res.status(401).json({ message: "unauthorized" });
			return false;
		}
	}
}

module.exports = Auth;
