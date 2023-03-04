import passport from '../config/passport';

export const IsJWTAuth = passport.authenticate('jwt', { session: false });

export const IsLocalAuth = passport.authenticate('local', { session: false });

export const IsResetAuth = passport.authenticate('reset', { session: false });
