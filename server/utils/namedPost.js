const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (post) => {
	if (Array.isArray(post)) {
		return Promise.all(
			post.map(async ({ id, title, body, userId, createdAt, updatedAt }) => {
				const { show, username } = await prisma.user.findUnique({ where: { id } });
				return { id, title, body, userId, show: show || username, createdAt, updatedAt };
			})
		);
	} else {
		const { id, title, body, userId, createdAt, updatedAt } = post;
		const { show, username } = await prisma.user.findUnique({ where: { id } });
		return { id, title, body, userId, show: show || username, createdAt, updatedAt };
	}
};
