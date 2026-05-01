import pkg from "pg"
import {drizzle} from "drizzle-orm/node-postgres";
import {env} from "../config/env.ts"


const {Pool} = pkg;

const pool = new Pool({
    connectionString : env.DATABASE_URL
})

export const db = drizzle(pool);