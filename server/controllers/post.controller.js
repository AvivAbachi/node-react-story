const db = require('../models');
const { namedPost } = require('../utils');
const Post = db.post;

exports.getAll = async (req, res) => {
	try {
		const limit = req.query.limit || 10;
		const page = req.query.page || 0;
		const offset = limit * page;
		const post = await Post.findAll({ order: [['createdAt', 'DESC']] }); //, limit, offset
		res.send(await namedPost(post));
	} catch ({ status, ...err }) {
		return res.status(status || 500).send(err);
	}
};

exports.getByUserId = async (req, res) => {
	try {
		const post = (await Post.findAll({ where: { userId: req.params.id } })) || undefined;
		if (!post.length) {
			throw { status: 404, err: [{ msg: 'User post Not found', param: 'id', value: req.params.id }] };
		}
		return res.send(await namedPost(post));
	} catch ({ status, ...err }) {
		return res.status(status || 500).send(err);
	}
};

exports.getByPostId = async (req, res) => {
	try {
		const post = await Post.findByPk(req.params.id);
		if (!post) {
			throw { status: 404, err: [{ msg: 'Post Not found', param: 'id', value: req.params.id }] };
		}
		res.send(await namedPost(post));
	} catch ({ status, ...err }) {
		return res.status(status || 500).send(err);
	}
};

exports.create = async (req, res) => {
	try {
		const NewPost = await new Post({ title: req.body.title, body: req.body.body, userId: req.user.id });
		const create = await NewPost.save();
		if (!create) {
			throw { status: 500, err: [{ msg: 'Erorr creating Post', param: 'server' }] };
		}
		res.send(create);
	} catch ({ status, ...err }) {
		const dsa = err;
		return res.status(status || 500).send(dsa);
	}
};

exports.update = async (req, res) => {
	try {
		const { id, title, body } = req.body;
		const update = await Post.update({ title, body }, { where: { id, userId: req.user.id } });
		if (!update) {
			throw { status: 500, err: [{ msg: 'No post to update Post.', param: 'server' }] };
		}
		res.send({ msg: 'Post was updated successfully' });
	} catch ({ status, ...err }) {
		return res.status(status || 500).send(err);
	}
};

exports.delete = async (req, res) => {
	try {
		const id = req.body.id;
		const del = await Post.destroy({ where: { id, userId: req.user.id } });
		if (!del) {
			throw [{ msg: 'No post to update Post.', param: 'server' }];
		}
		res.send({ msg: `Post was deleted successfully.` });
	} catch ({ status, ...err }) {
		return res.status(500).send(err);
	}
};
