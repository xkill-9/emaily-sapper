const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGO_URI,
  COOKIE_KEY,
  PORT,
} = process.env;

export const googleClientID = GOOGLE_CLIENT_ID;
export const googleClientSecret = GOOGLE_CLIENT_SECRET;
export const mongoURI = MONGO_URI;
export const cookieKey = COOKIE_KEY;
export const port = PORT || 5000;
