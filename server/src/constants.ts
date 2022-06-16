// ENV
const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const SESSION_SECRET = process.env.SESSION_SECRET
  ? process.env.SESSION_SECRET
  : "SECRET";

// CONFIG
const CLEAR_REDIS_ON_DEV_START = process.env.CLEAR_REDIS_ON_DEV_START
  ? process.env.CLEAR_REDIS_ON_DEV_START
  : false;

// CONNECTIONS
const SEQUELIZE_CONN_URI = process.env.SEQUELIZE_CONN_URI
  ? process.env.SEQUELIZE_CONN_URI
  : "sqlite://lr.db";

const REDIS_URI = process.env.REDIS_URI
  ? process.env.REDIS_URI
  : "redis://localhost:6379";

// ERRORS
const PAGE_NOT_FOUND_MSG = "Error 404.";

export {
  ENV,
  SEQUELIZE_CONN_URI,
  PAGE_NOT_FOUND_MSG,
  REDIS_URI,
  SESSION_SECRET,
  CLEAR_REDIS_ON_DEV_START,
};
