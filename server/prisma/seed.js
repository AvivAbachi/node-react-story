const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const data = require('./data.json');

async function main() {
	try {
		console.log('Start seeding ...');
		console.log('Seeding users...');
		const users = data.users;
		for (let i = 0; i < users.length; i++) {
			const password = await argon2.hash('ABCabc123');
			users[i].password = password;
		}
		await prisma.user.createMany({ data: users, skipDuplicates: true });
		console.log('Seeding posts...');
		const usersID = await prisma.user.findMany({ select: { id: true } });
		const posts = data.posts;
		for (let i = 0; i < posts.length; i++) {
			const j = Math.floor(usersID.length * Math.random());
			posts[i].userId = usersID[j].id;
		}
		await prisma.post.createMany({ data: posts });
		console.log('Seeding finished.');
	} catch (err) {
		console.error(err);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
