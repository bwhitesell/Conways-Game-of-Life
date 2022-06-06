// ENV
const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development"

// CONNECTIONS
const SEQUELIZE_CONN_URI = process.env.SEQUELIZE_CONN_URI ? process.env.SEQUELIZE_CONN_URI : "sqlite://lr.db"
const REDIS_URI = ""

// ERRORS
const PAGE_NOT_FOUND_MSG = "Error 404."

export { ENV, SEQUELIZE_CONN_URI, PAGE_NOT_FOUND_MSG }