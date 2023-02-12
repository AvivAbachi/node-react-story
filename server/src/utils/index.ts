import { sign } from 'jsonwebtoken';
import config from '../config/auth.config';

export function newToken(id: number) {
	return sign({ id }, config.secret, config.options);
}

export function formatPost(post: any, altAuthor?: any) {
	const createdAt = post.createdAt.getTime();
	const updatedAt = post.updatedAt.getTime();
	return {
		id: post.id,
		title: post.title,
		body: post.body,
		userId: post.userId,
		name:
			post.author?.name ||
			altAuthor?.name ||
			post.author?.username ||
			altAuthor?.username,
		date: updatedAt,
		isEdit: createdAt === updatedAt || createdAt === updatedAt - 1,
	};
}
