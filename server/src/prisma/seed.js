const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const data = require('./data.json');

(async function () {
	try {
		console.log('Start seeding ...');
		console.log('Seeding users...');
		const users = data.users;
		for (let i = 0; i < users.length; i++) {
			users[i].password = await argon2.hash('ABCabc123');
		}
		await prisma.user.createMany({ data: users });

		console.log('Seeding posts...');
		const usersIdList = await prisma.user.findMany({ select: { userId: true } });
		const posts = data.posts;
		for (let i = 0; i < posts.length; i++) {
			const j = Math.floor(usersIdList.length * Math.random());
			posts[i].userId = usersIdList[j].userId;
		}
		await prisma.post.createMany({ data: posts });
		console.log('Seeding finished.');
	} catch (err) {
		console.error(err);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
})();
