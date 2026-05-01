import {
    pgTable,
    uuid,
    text,
    timestamp,
    pgEnum,
    index,
} from "drizzle-orm/pg-core";
import { projects } from "./project";
import { users } from "./user";
import { workspaces } from "./workspace";

export const taskStatusEnum = pgEnum("task_status", ["TODO",
    "IN_PROGRESS",
    "DONE",])

export const tasks = pgTable("tasks", {

    id: uuid("id").defaultRandom().primaryKey(),

    title: text("title").notNull(),

    description: text("description"),

    status: taskStatusEnum("status").default("TODO").notNull(),

    projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull(),

    workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),

    assignedTo: uuid("assigned_to").references(() => users.id, { onDelete: "set null" }),

    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),

    dueDate: timestamp("due_date", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

}, (table) => {

    return {
        workspaceIdx: index("task_workspace_idx").on(table.workspaceId),
        projectIdx: index("task_project_idx").on(table.projectId),
        statusIdx: index("task_status_idx").on(table.status),
    }
})

export type TaskStatus = (typeof taskStatusEnum.enumValues)[number];