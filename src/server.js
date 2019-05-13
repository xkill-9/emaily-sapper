import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';

import { mongoURI, cookieKey } from './server/config';

// Load Mongoose models
import './server/models/User';
import './server/services/passport';
import requireLogin from './server/middlewares/requireLogin';

mongoose.connect(mongoURI, { useNewUrlParser: true });
const { NODE_ENV, PORT } = process.env;
const dev = NODE_ENV === 'development';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Authenticated routes
app.use('/api/charge', requireLogin);

app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware({
    session: req => {
      if (!req.user) return null;
      return { user: JSON.parse(JSON.stringify(req.user)) };
    },
  })
);

app.listen(PORT);
