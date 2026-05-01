import { db } from "../../db";
import { tasks } from "../../db/schema";
import { eq } from "drizzle-orm";
import type { TaskStatus } from "../../db/schema";
export const taskRepository = {
    async create(data:any){

        const [task] = await db.insert(tasks).values(data).returning();
        return task;

    },

  async findByWorkspace(workspaceId: string) {
    return db.query.tasks.findMany({
      where: eq(tasks.workspaceId, workspaceId),
      with: {
        project: true,
        assignedUser: true,
      },
    });
  },

    async updateStatus(taskId: string, status: TaskStatus) {
    return db
      .update(tasks)
      .set({ status })
      .where(eq(tasks.id, taskId));
  },
}
