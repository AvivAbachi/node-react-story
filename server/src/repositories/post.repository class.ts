import { Post, PrismaClient } from '@prisma/client';

import database from '../config/database';
import { Author, PostFormat } from '../types/Common/Index';
import { IPostRepository } from '../types/Repositories/Index';
import { PostListResponse } from '../types/Responses/PostListResponse';

class PostRepository implements IPostRepository {
	constructor(private readonly db: PrismaClient) {}

	public async GetAll(limit: number = 100, page?: number) {
		const post = await this.db.post.findMany({
			take: limit,
			skip: page ? page * limit : undefined,
			orderBy: [{ updatedAt: 'desc' }],
			include: { author: { select: { username: true, name: true } } },
		});

		return {
			post: post.map((post) => this.formatPost(post)),
			total: await this.db.post.count(),
		} as PostListResponse;
	}

	public async GetByPostId(id: number) {
		const post = await this.db.post.findUnique({
			where: { id },
			include: { author: { select: { username: true, name: true } } },
		});
		return post === null ? null : this.formatPost(post);
	}

	public async GetByUserId(userId: number, limit: number = 100, page?: number) {
		const user = await this.db.user.findFirst({
			where: { id: userId },
			include: {
				posts: {
					take: limit,
					skip: page ? page * limit : undefined,
					orderBy: [{ updatedAt: 'desc' }],
				},
				_count: true,
			},
		});
		if (user === null) return null;
		const author = {
			username: user.username,
			name: user.name,
		} as Author;
		return {
			post: user.posts.map((post) => this.formatPost({ ...post, author })),
			total: user._count.posts,
		} as PostListResponse;
	}

	public async CreatePost(userId: number, title: string, body: string | null) {
		return await this.db.post.create({ data: { title, body, userId } });
	}

	public async UpdatePost(postId: number, title?: string, body?: string) {
		return await this.db.post.update({ where: { id: postId }, data: { title, body } });
	}

	public async RemovePost(postId: number) {
		return await this.db.post.delete({ where: { id: postId } });
	}

	private formatPost(post: Post & { author: Author }) {
		const createdAt = post.createdAt.getTime();
		const updatedAt = post.updatedAt.getTime();
		return {
			id: post.id,
			title: post.title,
			body: post.body,
			userId: post.userId,
			name: post.author.name || post.author.username,
			date: updatedAt,
			isEdit: createdAt === updatedAt || createdAt === updatedAt - 1,
		} as PostFormat;
	}
}

//const postRepository = new PostRepository(database);

export default PostRepository;
