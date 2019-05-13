const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGO_URI,
  COOKIE_KEY,
  PORT,
  STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY,
} = process.env;

export const googleClientID = GOOGLE_CLIENT_ID;
export const googleClientSecret = GOOGLE_CLIENT_SECRET;
export const mongoURI = MONGO_URI;
export const cookieKey = COOKIE_KEY;
export const port = PORT || 5000;
export const stripePublicKey = STRIPE_PUBLIC_KEY;
export const stripeSecretKey = STRIPE_SECRET_KEY;
