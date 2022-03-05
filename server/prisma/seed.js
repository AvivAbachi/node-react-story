const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const data = require('./data.json');

async function main() {
	try {
		console.log('Start seeding ...');
		console.log('Seeding users...');
		for (const user of data.users) {
			const password = await argon2.hash('ABcd1234');
			await prisma.user.create({data: {...user, password}});
		}
		console.log('Seeding posts...');
		for (const post of data.posts) {
			const count = prisma.user.count();
			const userId = Math.ceil(count * Math.random());
			await prisma.post.create({data: {...post, userId}});
		}
		console.log('Seeding finished.');
	} catch (err) {
		console.error(err);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
