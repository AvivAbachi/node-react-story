const { PrismaClient } = require('@prisma/client');
const { namedPost } = require('../utils');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
	try {
		// const limit = req.query.limit || 10;
		// const page = req.query.page || 0;
		// const offset = limit * page;
		const post = await prisma.post.findMany({ orderBy: [{ createdAt: 'desc' }] });
		res.send(await namedPost(post));
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.getByUserId = async (req, res) => {
	try {
		const userId = parseInt(req.params.id) || -1;
		if (userId < 0) {
			throw { status: 404, err: [{ msg: 'Invalid user id', param: 'id', value: req.params.id }] };
		}
		const post = await prisma.user.findUnique({ where: { id: userId } }).posts();
		if (!post.length) {
			throw { status: 404, err: [{ msg: 'User post Not found', param: 'id', value: req.params.id }] };
		}
		res.send(post);
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.getByPostId = async (req, res) => {
	try {
		const id = parseInt(req.params.id) || -1;
		if (id < 0) {
			throw { status: 404, err: [{ msg: 'Invalid post id', param: 'id', value: id }] };
		}
		const post = await prisma.post.findUnique({ where: { id } });
		if (!post) {
			throw { status: 404, err: [{ msg: 'Post Not found', param: 'id', value: req.params.id }] };
		}
		res.send(await namedPost(post));
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
			throw { status: 500, err: [{ msg: 'Error creating Post', param: 'server' }] };
		}
		res.send(create);
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.update = async (req, res) => {
	try {
		const { id, title, body } = req.body;
		const userId = req.user;

		const update = await prisma.post.update({ where: { id }, data: { title, body } });

		if (!update) {
			throw { status: 500, err: [{ msg: 'No post to update Post.', param: 'server' }] };
		}
		res.send({ msg: 'Post was updated successfully' });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.delete = async (req, res) => {
	try {
		const id = parseInt(req.params.id) || -1;
		if (id < 0) {
			throw { status: 404, err: [{ msg: 'Invalid post id', param: 'id', value: id }] };
		}
		const userId = req.user.id;
		const del = await prisma.post.delete({ where: { id, userId } });
		if (!del) {
			throw [{ msg: 'No post to update Post.', param: 'server' }];
		}
		res.send({ msg: `Post was deleted successfully.` });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};
