import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});
const db = drizzle(pool);
export default db;
