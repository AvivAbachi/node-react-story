import { Post } from '@prisma/client';

import database from '../config/database';
import { Author, PostFormat } from '../types/Common/Index';
import { PostListResponse } from '../types/Responses/PostListResponse';

export async function GetAll(limit: number = 100, page?: number) {
	const post = await database.post.findMany({
		take: limit,
		skip: page ? page * limit : undefined,
		orderBy: [{ updatedAt: 'desc' }],
		include: { author: { select: { username: true, name: true } } },
	});

	return {
		post: post.map((post) => formatPost(post)),
		total: await database.post.count(),
	} as PostListResponse;
}

export async function GetByPostId(id: number) {
	const post = await database.post.findUnique({
		where: { id },
		include: { author: { select: { username: true, name: true } } },
	});
	return post === null ? null : formatPost(post);
}

export async function GetByUserId(userId: number, limit: number = 100, page?: number) {
	const user = await database.user.findFirst({
		where: { id: userId },
		include: {
			posts: {
				take: limit,
				skip: page ? page * limit : undefined,
				orderBy: [{ updatedAt: 'desc' }],
			},
			_count: true,
		},
	});
	if (user === null) return null;
	const author = {
		username: user.username,
		name: user.name,
	} as Author;
	return {
		post: user.posts.map((post) => formatPost({ ...post, author })),
		total: user._count.posts,
	} as PostListResponse;
}

export const CreatePost = async (userId: number, title: string, body: string | null) => {
	return await database.post.create({ data: { title, body, userId } });
};

export async function UpdatePost(postId: number, title?: string, body?: string) {
	return await database.post.update({ where: { id: postId }, data: { title, body } });
}

export async function RemovePost(postId: number) {
	return await database.post.delete({ where: { id: postId } });
}

const formatPost = (post: Post & { author: Author }) => {
	const createdAt = post.createdAt.getTime();
	const updatedAt = post.updatedAt.getTime();
	return {
		id: post.id,
		title: post.title,
		body: post.body,
		userId: post.userId,
		name: post.author.name || post.author.username,
		date: updatedAt,
		isEdit: createdAt === updatedAt || createdAt === updatedAt - 1,
	} as PostFormat;
};