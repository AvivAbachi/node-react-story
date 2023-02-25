import { User } from '@prisma/client';
import { Request, Response } from 'express';

import * as postRepository from '../repositories/post.repository';
import { AuthorizeRequest } from '../types/Requests/Index';

export const getAll = async (req: Request, res: Response) => {
	try {
		const limit = req.query.limit as number | undefined;
		const page = req.query.page as number | undefined;
		const posts = await postRepository.GetAll(limit, page);
		res.send(posts);
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};

export const getByUserId = async (req: Request, res: Response) => {
	try {
		const id = req.query.id as unknown as number;
		const limit = req.query.limit as number | undefined;
		const page = req.query.page as number | undefined;
		const posts = await postRepository.GetByUserId(id, limit, page);

		if (!posts) {
			throw {
				status: 404,
				err: [{ msg: 'User post Not found', param: 'id', value: req.params.id }],
			};
		}
		res.send(posts);
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};

export const getByPostId = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as unknown as number;
		console.log({ id });

		const post = await postRepository.GetByPostId(id);
		if (!post) {
			throw {
				status: 404,
				err: [{ msg: 'Post Not found', param: 'id', value: req.params.id }],
			};
		}
		res.send(post);
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};

export const create = async (req: AuthorizeRequest, res: Response) => {
	try {
		const title = req.body.title;
		const body = req.body.body;
		const userId = (req.user as User)?.id;
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
};

export const update = async (req: AuthorizeRequest, res: Response) => {
	try {
		const title = req.body.title;
		const body = req.body.body;
		const postId = req.body.id;
		const update = await postRepository.UpdatePost(postId, title, body);
		if (!update) {
			throw {
				status: 500,
				err: [{ msg: 'No post to update Post.', param: 'server' }],
			};
		}
		res.send({ msg: 'Post was updated successfully' });
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};

export const remove = async (req: AuthorizeRequest, res: Response) => {
	try {
		const postId = Number(req.body.id);
		const remove = await postRepository.RemovePost(postId);
		if (!remove) {
			throw { msg: 'Post not remove.', param: 'server' };
		}
		res.send({ msg: `Post was remove successfully.` });
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};
