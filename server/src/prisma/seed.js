const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const data = require('./data.json');

const prisma = new PrismaClient();

async function seedDatabase() {
	console.log('Start seeding...');

	await seedUsers();
	await seedPosts();

	console.log('Seeding finished!');
}

async function seedUsers() {
	console.log('Seeding users...');

	const defaultPassword = 'ABCabc123';

	const users = await Promise.all(
		data.users.map(async (user) => {
			const hashedPassword = await argon2.hash(defaultPassword);
			return { ...user, password: hashedPassword };
		})
	);

	await prisma.user.createMany({ data: users });
}

async function seedPosts() {
	console.log('Seeding posts...');

	const maxTimeDelta = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
	const date = new Date();
	const users = await prisma.user.findMany({ select: { userId: true } });

	const seededPosts = data.posts.map((post) => {
		const index = Math.floor(users.length * Math.random());
		const userId = users[index].userId;
		const createdAt = new Date(date);
		const updatedAt = createdAt;

		date.setTime(date.getTime() - Math.random() * maxTimeDelta);

		return { ...post, userId, createdAt, updatedAt };
	});

	await prisma.post.createMany({ data: seededPosts });
}

seedDatabase().catch((error) => {
	console.error(error);
});
