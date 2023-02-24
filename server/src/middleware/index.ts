import {
	username,
	password,
	email,
	displayName,
	cheakUsername,
	cheakEmail,
	pages,
	id,
	postTitle,
	postBody,
	postId,
	errors,
} from './validators';

export default {
	signup: [username, password, email, displayName, errors],
	reset: [cheakUsername, cheakEmail, errors],
	update: [email, errors],
	postAll: [pages, errors],
	postId: [id, errors],
	postUserId: [id, pages, errors],
	createPost: [postTitle, postBody, errors],
	updatePost: [postTitle, postBody, postId, errors],
	deletePost: [postId, errors],
};
