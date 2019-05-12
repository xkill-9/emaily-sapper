import passport from 'passport';

export async function get(req, res, next) {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
}
