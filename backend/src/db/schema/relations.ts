
import { relations } from "drizzle-orm";

import { users } from "./user";
import { workspaces } from "./workspace";
import { workspaceMembers } from "./workspaceMember";
import { projects } from "./project";
import { tasks } from "./task";


export const userRelations = relations(users , ({many})=>({
    memberships : many(workspaceMembers),
    createdProjects : many(projects),
    assignedTasks : many(tasks , {
        relationName : "assignedTasks"
    }),
    createdTasks : many(tasks , {
        relationName : "createdTasks",
    })

}));

export const workspaceRelations = relations (workspaces , ({many})=>({
    members : many(workspaceMembers),
    projects : many(projects),
    tasks : many(tasks),
}));

export const workspaceMemberRelations = relations(workspaceMembers , ({one})=>({
 user: one(users, {
      fields: [workspaceMembers.userId],
      references: [users.id],
 }),

 workspace : one(workspaces , {
    fields : [workspaceMembers.workspaceId],
    references:[workspaces.id],
 }),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [projects.workspaceId],
    references: [workspaces.id],
  }),

  creator: one(users, {
    fields: [projects.createdBy],
    references: [users.id],
  }),

  tasks: many(tasks),
}));

export const taskRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),

  workspace: one(workspaces, {
    fields: [tasks.workspaceId],
    references: [workspaces.id],
  }),

  assignedUser: one(users, {
    fields: [tasks.assignedTo],
    references: [users.id],
    relationName: "assignedTasks",
  }),

  createdByUser: one(users, {
    fields: [tasks.createdBy],
    references: [users.id],
    relationName: "createdTasks",
  }),
}));