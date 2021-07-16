const login = require('./verifyLogin');
const reset = require('./verifyReset');
const signUp = require('./verifySignUp');
const token = require('./verifyToken');

exports.errorResult = require('./errorResult');
exports.verifyPost = require('./verifyPost');
exports.verify = { login, reset, signUp, token };
