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

export async function GetByPostId(postId: number) {
	const post = await database.post.findUnique({
		where: { postId },
		include: { author: { select: { username: true, name: true } } },
	});
	return post === null ? null : formatPost(post);
}

export async function GetByUserId(userId: number, limit: number = 100, page?: number) {
	const user = await database.user.findFirst({
		where: { userId },
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

export async function CreatePost(userId: number, title: string, body: string | null) {
	return await database.post
		.create({
			data: { title, body, userId },
			include: { author: { select: { username: true, name: true } } },
		})
		.then((post) => formatPost(post));
}

export async function UpdatePost(postId: number, title?: string, body?: string) {
	return await database.post
		.update({
			where: { postId },
			data: { title, body },
			include: { author: { select: { username: true, name: true } } },
		})
		.then((post) => formatPost(post));
}

export async function RemovePost(postId: number) {
	return await database.post
		.delete({
			where: { postId },
			include: { author: { select: { username: true, name: true } } },
		})
		.then((post) => formatPost(post));
}

export async function IsUserPost(userId: number, postId: number) {
	const res = await database.post.findFirst({
		where: { AND: { userId, postId: Number(postId) } },
		select: { postId: true },
	});

	return res !== null;
}

function formatPost(post: Post & { author: Author }) {
	const createdAt = post.createdAt.getTime();
	const updatedAt = post.updatedAt.getTime();
	return {
		postId: post.postId,
		title: post.title,
		body: post.body,
		userId: post.userId,
		name: post.author.name || post.author.username,
		date: updatedAt,
		isEdit: createdAt === updatedAt || createdAt === updatedAt - 1,
	} as PostFormat;
}
