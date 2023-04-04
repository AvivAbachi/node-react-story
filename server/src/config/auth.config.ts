import { GenerateOptions } from 'generate-password';
import { SignOptions } from 'jsonwebtoken';

const config: {
	secret: string;
	options: SignOptions;
	resetPasword: GenerateOptions;
} = {
	secret: 'story-secret-key',
	options: {
		algorithm: 'HS512',
		expiresIn: '7d',
	},
	resetPasword: {
		lowercase: true,
		uppercase: true,
		numbers: true,
		length: 16,
	},
};
export default config;
