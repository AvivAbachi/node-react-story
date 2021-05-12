const { checkSchema } = require('express-validator');
// const { post } = require('../models');

const postSchema = {
	title: {
		trim: [' '],
		isLength: {
			options: { min: 8, max: 64 },
			errorMessage: 'Post title must be between 4 to 64 chars long',
		},
	},
	body: {
		trim: [' '],
		isLength: {
			options: { max: 500 },
			errorMessage: 'Post text can be up to 500 chars long',
		},
	},
};

const updateSchema = {
	id: {
		isInt: true,
		toInt: true,
		errorMessage: 'Post Id is not allowed',
	},
	title: postSchema.title,
	body: postSchema.title,
};

const deleteSchema = {
	id: {
		custom: {
			options: (ids) => {
				const idArray = Array.isArray(ids);
				if (idArray) {
					return ids.every((id) => Number.isInteger(parseInt(id)));
				} else if (Number.isInteger(parseInt(ids))) {
					return true;
				}
			},
		},
	},
};

exports.create = checkSchema(postSchema);
exports.update = checkSchema(updateSchema);
exports.delete = checkSchema(deleteSchema);
