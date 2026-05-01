import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";

export const workspaces = pgTable("workspaces", {
    id: uuid('id').defaultRandom().primaryKey(),

    name: text("name").notNull(),

    ownerId: uuid("owner_id").references(() => users.id, { onDelete: "cascade" }),
    
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})