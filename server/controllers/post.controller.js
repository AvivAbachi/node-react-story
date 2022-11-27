const { PrismaClient } = require('@prisma/client');
const { formatPost } = require('../utils');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
	try {
		const { page, limit } = req.query;
		req.post = await prisma.post.findMany({
			take: limit || 100,
			skip: page * limit || undefined,
			orderBy: [{ updatedAt: 'desc' }],
			include: { author: { select: { username: true, name: true } } },
		});
		req.post = req.post.map((post) => formatPost(post));
		req.total = await prisma.post.count();
		res.send({ post: req.post, total: req.total });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.getByUserId = async (req, res) => {
	try {
		const { page, limit } = req.query;
		req.user = await prisma.user.findUnique({
			where: { id: req.params.id },
			include: {
				posts: {
					take: limit || 100,
					skip: page * limit || undefined,
					orderBy: [{ updatedAt: 'desc' }],
				},
				_count: true,
			},
		});
		if (!req.user) {
			throw {
				status: 404,
				err: [
					{ msg: 'User post Not found', param: 'id', value: req.params.id },
				],
			};
		}
		req.post = req.user.posts.map((post) => {
			return formatPost(post, req.user);
		});
		req.total = req.user._count.posts;
		res.send({ post: req.post, total: req.total });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.getByPostId = async (req, res) => {
	try {
		req.post = await prisma.post.findUnique({
			where: { id: req.params.id },
			include: { author: { select: { username: true, name: true } } },
		});
		if (!req.post) {
			throw {
				status: 404,
				err: [{ msg: 'Post Not found', param: 'id', value: req.params.id }],
			};
		}
		res.send(formatPost(req.post));
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.create = async (req, res) => {
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
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.update = async (req, res) => {
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
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.delete = async (req, res) => {
	try {
		const id = req.body.id;
		const userId = req.user.id;
		const del = await prisma.post.deleteMany({
			where: { AND: { id, author: { id: userId } } },
		});
		if (!del?.count) {
			throw { msg: 'Post not delete.', param: 'server' };
		}
		res.send({ msg: `Post was deleted successfully.` });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};
