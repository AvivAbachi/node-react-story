import { User } from '@prisma/client';
import { Request, Response } from 'express';

import * as postRepository from '../repositories/post.repository';
import { AuthorizeRequest } from '../types/Requests/Index';

export async function getAll(req: Request, res: Response) {
	try {
		const limit = req.query.limit as number | undefined;
		const page = req.query.page as number | undefined;
		const posts = await postRepository.GetAll(limit, page);
		res.send(posts);
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}

export async function getByUserId(req: Request, res: Response) {
	try {
		const userId = req.params.userId as unknown as number;
		const limit = req.query.limit as number | undefined;
		const page = req.query.page as number | undefined;
		const posts = await postRepository.GetByUserId(userId, limit, page);
		if (!posts) {
			throw {
				status: 404,
				err: [{ msg: 'User post Not found', param: 'userId', value: userId }],
			};
		}
		res.send(posts);
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}

export async function getByPostId(req: Request, res: Response) {
	try {
		const postId = req.params.postId as unknown as number;
		const post = await postRepository.GetByPostId(postId);
		if (!post) {
			throw {
				status: 404,
				err: [{ msg: 'Post Not found', param: 'postId', value: postId }],
			};
		}
		res.send(post);
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}

export async function create(req: AuthorizeRequest, res: Response) {
	try {
		const userId = (req.user as User)?.userId;
		const title = req.body.title;
		const body = req.body.body;
		const create = await postRepository.CreatePost(userId, title, body);
		if (!create) {
			throw {
				status: 500,
				err: [{ msg: 'Error creating Post', param: 'server' }],
			};
		}
		res.send(create);
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}

export async function update(req: AuthorizeRequest, res: Response) {
	try {
		const postId = req.params.postId as unknown as number;
		const title = req.body.title as string;
		const body = req.body.body as string | undefined;
		const update = await postRepository.UpdatePost(postId, title, body);
		if (!update) {
			throw {
				status: 500,
				err: [{ msg: 'No post to update Post.', param: 'server' }],
			};
		}
		res.send(update);
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}

export async function remove(req: AuthorizeRequest, res: Response) {
	try {
		const postId = req.params.postId as unknown as number;
		const remove = await postRepository.RemovePost(postId);
		if (!remove) {
			throw { msg: 'Post not remove.', param: 'server' };
		}
		res.send(remove);
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
}
