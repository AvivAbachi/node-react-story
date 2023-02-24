import passport from '../config/passport';

export const IsJWTAuth = passport.authenticate('jwt', { session: false });
//Authorization:Bearer
export const IsLocalAuth = passport.authenticate('local', { session: false });
