import { db } from "./db";
import { users, workspaces, projects, tasks } from "./db/schema";

async function main() {
  const [user] = await db.insert(users).values({
    email: "task@test.com",
    password: "123456",
  }).returning();

  const [workspace] = await db.insert(workspaces).values({
    name: "Workspace A",
    ownerId: user.id,
  }).returning();

  const [project] = await db.insert(projects).values({
    name: "Project A",
    workspaceId: workspace.id,
    createdBy: user.id,
  }).returning();

  await db.insert(tasks).values({
    title: "First Task",
    workspaceId: workspace.id,
    projectId: project.id,
    assignedTo: user.id,
    createdBy: user.id,
  });

  const data = await db.select().from(tasks);
  console.log(data);
}

main();