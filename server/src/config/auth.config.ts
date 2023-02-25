import { GenerateOptions } from 'generate-password';
import { SignOptions } from 'jsonwebtoken';

export default {
	secret: 'story-secret-key',
	options: {
		algorithm: 'HS512',
		expiresIn: '7d',
	} as SignOptions,

	resetPasword: {
		lowercase: true,
		uppercase: true,
		numbers: true,
		length: 16,
	} as GenerateOptions,
};
