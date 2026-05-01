import { db } from "../../db/"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm";

export const userRepository = {
    async create(data: { email: string; password: string }) {
        const [user] = await db.insert(users).values(data).returning();
        return user;
    },

    async findByEmail(email: string) {
        return db.query.users.findFirst({
            where: eq(users.email, email),
        });
    },
    async findById(id: string) {
        return db.query.users.findFirst({
            where: eq(users.id, id),
        });
    },

}