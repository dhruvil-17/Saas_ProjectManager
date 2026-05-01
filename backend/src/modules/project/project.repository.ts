import { db } from "../../db";
import { projects } from "../../db/schema";
import { eq } from "drizzle-orm";

export const projectRepository = {

    async create(data:{
        name:string; 
        workspaceId:string; 
        createdBy:string;
    }){
        const [project]=await db.insert(projects).values(data).returning();
        return project;
    },

    async findByWorkspace(workspaceId:string){
        return db.query.projects.findMany({
            where : eq(projects.workspaceId , workspaceId)
        });
    },
};