import passport from 'passport';
import { Strategy as CustomStrategy } from 'passport-custom';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import * as userRepository from '../repositories/user.repository';
import * as postRepository from '../repositories/post.repository';
import config from './auth.config';
import { User } from '@prisma/client';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret,
} as StrategyOptions;

passport.use(
	new LocalStrategy(function (username, password, done) {
		userRepository
			.GetUserByUsername(username)
			.then(async (user) => {
				if (!user) {
					return done(null, false, { message: 'Username not exist' });
				}
				if (!(await userRepository.CheakPassword(user.password, password))) {
					return done(null, false, { message: 'Invalid password' });
				}
				return done(null, user);
			})
			.catch((err) => done(err, false));
	})
);

passport.use(
	new JwtStrategy(opts, function (payload, done) {
		userRepository
			.GetUserById(payload.userId)
			.then((user) => {
				if (!user) {
					return done(null, false);
				}
				return done(null, user);
			})
			.catch((err) => {
				return done(err);
			});
	})
);

passport.use(
	'reset',
	new CustomStrategy(function (req, done) {
		userRepository
			.GetUserByUsername(req.body.username.trim().toLowerCase())
			.then((user) => {
				if (!user) {
					return done(null, false);
				}
				if (user.email !== req.body.email.trim().toLowerCase()) {
					return done(null, false);
				}
				return done(null, user);
			})
			.catch((err) => {
				return done(err);
			});
	})
);

passport.use(
	'user-post',
	new CustomStrategy(function (req, done) {
		const userId = (req.user as User).userId;
		const postId = req.params.postId as unknown as number;
		postRepository
			.IsUserPost(userId, postId)
			.then((isUserPost) => done(null, isUserPost))
			.catch((err) => done(err));
	})
);

export default passport;
