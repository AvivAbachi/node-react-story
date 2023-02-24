import { Post } from '@prisma/client';
import { PostFormat } from '../Common/Index';
import { PostListResponse } from '../Responses/PostListResponse';

export interface IPostRepository {
	GetAll(limit?: number, page?: number): Promise<PostListResponse>;
	GetByPostId(id: number): Promise<PostFormat | null>;
	GetByUserId(
		userId: number,
		limit?: number,
		page?: number
	): Promise<PostListResponse | null>;
	CreatePost(userId: number, title: string, body: string | null): Promise<Post>;
	UpdatePost(postId: number, title: string, body: string): Promise<Post>;
	RemovePost(postId: number): Promise<Post>;
}
