import {
  pgTable,
  uuid,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { workspaces } from "./workspace";
import { users } from "./user";

export const projects = pgTable("projects" , {
    id : uuid("id").defaultRandom().primaryKey(),

    name : text("name").notNull(),

    workspaceId : uuid("workspace_id").notNull().references(()=>workspaces.id , {onDelete:"cascade"}),

    createdBy : uuid("created_by").notNull().references(()=>users.id , {onDelete : "set null"}),

    createdAt : timestamp("created_at" , {withTimezone : true}).defaultNow(),

})