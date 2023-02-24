import { PostFormat } from '../Common/Index';

export type PostListResponse = {
	post: PostFormat[];
	total: number;
};
