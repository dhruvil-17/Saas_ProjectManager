import { pgTable , uuid , timestamp , pgEnum , uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from "./user";
import { workspaces } from "./workspace";

export const roleEnum = pgEnum("role", ["OWNER" , "ADMIN" , "MEMBER"]);

export const workspaceMembers = pgTable("workspace_members" , {
    id : uuid("id").defaultRandom().primaryKey(),

    userId : uuid("user_id").references(()=> users.id , {onDelete : "cascade"}),

    workspaceId : uuid("workspace_id").references(()=> workspaces.id , {onDelete : "cascade"}),

    role: roleEnum("role").default("MEMBER").notNull(),

    joinedAt : timestamp("joined_at" , {withTimezone : true}).defaultNow(),

   
},  (table)=>{
    return{
        uniqueUserWorkspace : uniqueIndex("unique_user_workspace").on(table.userId , table.workspaceId)
    }
});