import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import mongoose from 'mongoose';

import { googleClientID, googleClientSecret } from '../config';

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId).lean();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await new User({ googleId: profile.id }).save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
