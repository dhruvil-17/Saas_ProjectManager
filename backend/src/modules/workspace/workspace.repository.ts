import { db } from "../../db";
import { workspaces } from "../../db/schema";
import { eq } from "drizzle-orm";

export const workspaceRepository = {

    async create(data:{name : string; ownerId:string}){
        const [workspace] = await db.insert(workspaces).values(data).returning()
    },

    async findById(id:string){
        return db.query.workspaces.findFirst({
            where: eq(workspaces.id , id)
        })
    },

    async findUserWorkspaces(userId:string){
        return db.query.workspaceMembers.findMany({
            where : (wm , {eq}) => eq(wm.userId , userId),
            with :{
                workspace : true,
            }
        })
    }
}