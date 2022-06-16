const BACKEND_URL: string = process.env.BACKEND_URL
  ? process.env.BACKEND_URL
  : "http://localhost:4000";

export { BACKEND_URL };
