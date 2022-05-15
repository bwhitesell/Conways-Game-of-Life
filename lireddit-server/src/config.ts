import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from 'express-session'


const redisStore = connectRedis(session)


const SESSION_CONFIG: session.SessionOptions = {
  name: "cookie",
  store: new redisStore({
    client: new Redis('redis://localhost:6379'),
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    httpOnly: true,
    sameSite: "lax", // csrf
    secure: false, // cookie only works in https
  },
  saveUninitialized: false,
  secret: 'secret',
  resave: false,
}

export { SESSION_CONFIG }