const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const config = require('../config/auth.config');
const prisma = new PrismaClient();

const userData = [
	{
		username: 'alicehamil',
		email: 'alicehamilton@example.com',
		password: 'DSAdsa321',
		show: 'Alicedsa',
		posts: {
			create: [
				{
					title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
					body:
						'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
				},
			],
		},
	},
	{
		username: 'lilybenett',
		email: 'lily.bennett@example.com',
		password: 'DSAdsa321',
		show: 'Lily Bennett',
		posts: {
			create: [
				{
					title: 'qui est esse',
					body:
						'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
				},
			],
		},
	},
	{
		username: 'dennis131',
		email: 'dennis.robertson@example.com',
		password: 'DSAdsa321',
		show: 'Dennis Robertson',
		posts: {
			create: [
				{
					title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
					body:
						'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
				},
				{
					title: 'eum et est occaecati',
					body:
						'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
				},
			],
		},
	},
];

async function main() {
	try {
		console.log(`Start seeding ...`);
		for (const user of userData) {
			const password = await argon2.hash(user.password, { salt: config.salt});
			await prisma.user.create({ data: { ...user, password } });
		}
		console.log(`Seeding finished.`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main().then( );
