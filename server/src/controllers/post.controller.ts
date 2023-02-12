import { PrismaClient } from '@prisma/client/';
import { formatPost } from '../utils';
const prisma = new PrismaClient();

import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
	try {
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);
		const post = await prisma.post.findMany({
			take: limit || 100,
			skip: page * limit || undefined,
			orderBy: [{ updatedAt: 'desc' }],
			include: { author: { select: { username: true, name: true } } },
		});
		res.send({
			post: post.map((post) => formatPost(post)),
			total: await prisma.post.count(),
		});
	} catch (err: any) {
		console.log(err);

		res.status(err.status || 500).send(err);
	}
};

export const getByUserId = async (req: Request, res: Response) => {
	try {
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);
		const id = Number(req.query.id);
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				posts: {
					take: limit || 100,
					skip: page * limit || undefined,
					orderBy: [{ updatedAt: 'desc' }],
				},
				_count: true,
			},
		});
		if (!user) {
			throw {
				status: 404,
				err: [{ msg: 'User post Not found', param: 'id', value: req.params.id }],
			};
		}
		res.send({
			post: user.posts.map((post) => formatPost(post, user)),
			total: user._count.posts,
		});
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};

export const getByPostId = async (req: Request, res: Response) => {
	try {
		const id = Number(req.query.id);

		const post = await prisma.post.findUnique({
			where: { id },
			include: { author: { select: { username: true, name: true } } },
		});
		if (!post) {
			throw {
				status: 404,
				err: [{ msg: 'Post Not found', param: 'id', value: req.params.id }],
			};
		}
		res.send(formatPost(post));
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};

export const create = async (req: Request | any, res: Response) => {
	try {
		const { title, body } = req.body;
		const userId = req.user.id;
		const create = await prisma.post.create({ data: { title, body, userId } });
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

export const update = async (req: Request | any, res: Response) => {
	try {
		const { id, title, body } = req.body;
		const userId = req.user.id;
		const update = await prisma.post.updateMany({
			where: { AND: { id, author: { id: userId } } },
			data: { title, body },
		});
		if (!update?.count) {
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

export const remove = async (req: Request | any, res: Response) => {
	try {
		const id = req.body.id;
		const userId = req.user.id;
		const del = await prisma.post.deleteMany({
			where: { AND: { id, author: { id: userId } } },
		});
		if (!del?.count) {
			throw { msg: 'Post not remove.', param: 'server' };
		}
		res.send({ msg: `Post was remove successfully.` });
	} catch (err: any) {
		res.status(err.status || 500).send(err);
	}
};
