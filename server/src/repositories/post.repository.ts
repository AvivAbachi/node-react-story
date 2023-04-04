import { Post } from '@prisma/client';

import database from '../config/database';
import { Author, PostFormat } from '../types/Common/Index';
import { PostListResponse } from '../types/Responses/PostListResponse';

export async function GetAll(limit: number = 100, page?: number): Promise<PostListResponse> {
	const post = await database.post.findMany({
		take: limit,
		skip: page ? page * limit : undefined,
		orderBy: [{ updatedAt: 'desc' }],
		include: { author: { select: { username: true, name: true } } },
	});

	return {
		post: post.map((post) => formatPost(post)),
		total: await database.post.count(),
	};
}

export async function GetByPostId(postId: number) {
	const post = await database.post.findUnique({
		where: { postId },
		include: { author: { select: { username: true, name: true } } },
	});
	return post === null ? null : formatPost(post);
}

export async function GetByUserId(userId: number, limit: number = 100, page?: number): Promise<PostListResponse | null> {
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
	const author: Author = {
		username: user.username,
		name: user.name,
	};
	return {
		post: user.posts.map((post) => formatPost({ ...post, author })),
		total: user._count.posts,
	};
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

const dateTimeFormat = new Intl.DateTimeFormat('es', {
	dateStyle: 'short',
	timeStyle: 'medium',
	hour12: false,
});

function formatPost({ author, createdAt, updatedAt, ...post }: Post & { author: Author }): PostFormat {
	const name = author.name || author.username;
	const date = dateTimeFormat.format(updatedAt);
	const isEdit = Math.abs(createdAt.getTime() - updatedAt.getTime()) <= 1;
	return { name, date, isEdit, ...post };
}
