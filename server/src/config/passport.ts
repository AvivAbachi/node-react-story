import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';

import * as userRepository from '../repositories/user.repository';
import config from './auth.config';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret,
};

passport.use(
	new LocalStrategy(function (username, password, done) {
		userRepository
			.GetUserByUsername(username)
			.then(async (user) => {
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!(await userRepository.CheakPassword(user.password, password))) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			})
			.catch((err) => done(err, false));
	})
);

passport.use(
	new JwtStrategy(opts, function (payload, done) {
		userRepository
			.GetUserById(payload.id)
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
	new CustomStrategy(function (req, done) {
		userRepository
			.GetUserByUsername(req.body.username)
			.then((user) => {
				if (!user) {
					return done(null, false);
				}
				if (user.email !== req.body.email) {
					return done(null, false);
				}
				return done(null, user);
			})
			.catch((err) => {
				return done(err);
			});
	})
);

export default passport;
