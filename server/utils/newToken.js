const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

module.exports = (id) => jwt.sign({ id }, config.secret, config.options);
