const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const limit = req.query.limit || 10;
// const page = req.query.page || 0;
// const offset = limit * page;
exports.getAll = async (req, res, next) => {
	try {
		req.post = await prisma.post.findMany({
			orderBy: [{ createdAt: 'desc' }],
			select: {
				id: true,
				title: true,
				body: true,
				createdAt: true,
				updatedAt: true,
				author: { select: { username: true, show: true } },
			},
		});
		next();
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.getByUserId = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.id) || -1;
		if (userId < 0) {
			throw { status: 404, err: [{ msg: 'Invalid user id', param: 'id', value: req.params.id }] };
		}

		req.post = (
			await prisma.user.findUnique({
				where: { id: userId },
				select: {
					posts: {
						orderBy: [{ createdAt: 'desc' }],
						select: {
							id: true,
							title: true,
							body: true,
							createdAt: true,
							updatedAt: true,
							author: { select: { username: true, show: true } },
						},
					},
				},
			})
		)?.posts;
		if (!req.post) {
			throw { status: 404, err: [{ msg: 'User post Not found', param: 'id', value: req.params.id }] };
		}
		next();
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};

exports.getByPostId = async (req, res, next) => {
	try {
		const id = parseInt(req.params.id) || -1;
		if (id < 0) {
			throw { status: 404, err: [{ msg: 'Invalid post id', param: 'id', value: id }] };
		}
		req.post = await prisma.post.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				body: true,
				createdAt: true,
				updatedAt: true,
				author: { select: { username: true, show: true } },
			},
		});
		if (!req.post) {
			throw { status: 404, err: [{ msg: 'Post Not found', param: 'id', value: req.params.id }] };
		}
		req.post = [req.post];
		next();
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
		const id = parseInt(req.body.id) || -1;
		const userId = req.user.id;
		if (id < 0) {
			throw { status: 404, err: [{ msg: 'Invalid post id', param: 'id', value: id }] };
		}
		const del = await prisma.post.deleteMany({ where: { AND: { id, author: { id: userId } } } });
		if (!del?.count) {
			throw { msg: 'Post not delete.', param: 'server' };
		}
		res.send({ msg: `Post was deleted successfully.` });
	} catch (err) {
		res.status(err.status || 500).send(err);
	}
};
