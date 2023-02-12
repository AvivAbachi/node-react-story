import { SignOptions } from 'jsonwebtoken';

export default {
	secret: 'story-secret-key',
	options: {
		algorithm: 'HS512',
		expiresIn: '7d',
	} as SignOptions,
};
