const { validationResult } = require('express-validator');

exports.verifyPost = require('./verifyPost');
exports.verifyUser = require('./verifyUser');
exports.token = require('./verifyToken');

exports.errorHandel = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors.array());
	}
	next();
};
