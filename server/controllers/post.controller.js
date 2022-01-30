const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const formatPost = (createdAt, updatedAt, { show, username }, post) => {
	createdAt = createdAt.getTime();
	updatedAt = updatedAt.getTime();
	if (createdAt === updatedAt - 1) updatedAt--;
	return { ...post, name: show || username, createdAt, updatedAt };
};

exports.getAll = async (req, res, next) => {
	try {
		const limit = parseInt(req.query.limit) || 100;
		const pages = parseInt(req.query.limit) * parseInt(req.query.page) || undefined;
		req.post = await prisma.post.findMany({
			take: limit,
			skip: pages,
			orderBy: [{ createdAt: 'desc' }],
			include: { author: { select: { username: true, show: true } } },
		});
		req.post = req.post.map(({ createdAt, updatedAt, author, ...post }) => {
			return formatPost(createdAt, updatedAt, author, post);
		});
		req.total = await prisma.post.count();
		res.send({ post: req.post, total: req.total });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.getByUserId = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.userId) || -1;
		if (userId < 0) {
			throw { status: 400, err: [{ msg: 'Invalid user id', param: 'id', value: req.params.id }] };
		}
		req.user = await prisma.user.findUnique({ where: { id: userId }, include: { posts: true, _count: true } });
		if (!req.user) {
			throw { status: 404, err: [{ msg: 'User post Not found', param: 'id', value: req.params.id }] };
		}
		req.post = req.user.posts.map(({ createdAt, updatedAt, ...post }) => {
			return formatPost(createdAt, updatedAt, { show: req.user?.show, username: req.user.username }, post);
		});
		req.total = req.user._count.posts;
		res.send({ post: req.post, total: req.total });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.getByPostId = async (req, res) => {
	try {
		const id = parseInt(req.params.id) || -1;
		if (id < 0) {
			throw { status: 400, err: [{ msg: 'Invalid post id', param: 'id', value: id }] };
		}
		req.post = await prisma.post.findUnique({ where: { id }, include: { author: { select: { username: true, show: true } } } });
		if (!req.post) {
			throw { status: 404, err: [{ msg: 'Post Not found', param: 'id', value: req.params.id }] };
		}
		const { createdAt, updatedAt, author, ...post } = req.post;
		res.send(formatPost(createdAt, updatedAt, author, post));
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
		const userId = req.user.id;
		const update = await prisma.post.updateMany({ where: { AND: { id, author: { id: userId } } }, data: { title, body } });
		if (!update?.count) {
			throw { status: 500, err: [{ msg: 'No post to update Post.', param: 'server' }] };
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
		const del = await prisma.post.deleteMany({ where: { AND: { id, author: { id: userId } } } });
		if (!del?.count) {
			throw { msg: 'Post not delete.', param: 'server' };
		}
		res.send({ msg: `Post was deleted successfully.` });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};
