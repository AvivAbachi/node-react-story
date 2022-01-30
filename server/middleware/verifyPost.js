const { checkSchema, body } = require('express-validator');

exports.create = [
	body('title').trim(' ').isLength({ min: 4, max: 64 }).withMessage('Post title must be between 4 to 64 chars long'),
	body('body').trim(' ').isLength({ max: 500 }).withMessage('Post text can be up to 500 chars long'),
];

exports.delete = [body('id').toInt().isInt({ min: 0 }).withMessage('Post Id is not allowed')];
exports.update = [exports.create[0], exports.create[1], exports.delete[0]];

// const postSchema = {
// 	title: {
// 		trim: [' '],
// 		isLength: {
// 			options: { min: 4, max: 64 },
// 			errorMessage: 'Post title must be between 4 to 64 chars long',
// 		},
// 	},
// 	body: {
// 		trim: [' '],
// 		isLength: {
// 			options: { max: 500 },
// 			errorMessage: 'Post text can be up to 500 chars long',
// 		},
// 	},
// };

// const deleteSchema = {
// 	id: {
// 		isInt: { options: { min: 0 } },
// 		toInt: true,
// 		errorMessage: 'Post Id is not allowed',
// 	},
// };

// const updateSchema = {
// 	id: deleteSchema.id,
// 	title: postSchema.title,
// 	body: postSchema.body,
// };

// exports.create = checkSchema(postSchema);
// exports.update = checkSchema(updateSchema);
// exports.delete = checkSchema(deleteSchema);
