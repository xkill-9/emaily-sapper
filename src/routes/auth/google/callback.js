import passport from 'passport';

export async function get(req, res, next) {
  passport.authenticate('google', {
    successRedirect: '/surveys',
    failureRedirect: '/auth/google',
  })(req, res, next);
}
