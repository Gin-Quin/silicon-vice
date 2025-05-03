import { Pool, QueryResult } from "pg";
import { env } from "./env";

export const pool = new Pool({
	connectionString: env.DATABASE_URL,
});
