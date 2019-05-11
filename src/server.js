import 'dotenv/config';
import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieSession from 'cookie-session';
import * as sapper from '@sapper/server';

import { port, mongoURI, cookieKey } from './server/config';

// Load Mongoose models
import './server/models/User';
import './server/services/passport';

mongoose.connect(mongoURI, { useNewUrlParser: true });
const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware()
);

app.listen(port);
