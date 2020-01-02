import { v4 } from "uuid";
import { Redis } from "ioredis";

export const createEmailConfirmationLink = async (
    url: string,
    userId: string,
    redis: Redis,
) => {
    try {
        const id = v4();
        await redis.set(id, userId, "EX", 60 * 60 * 24);
        return `${url}/confirm/${id}`;
    } catch(error) {
        console.log(error);
    }
}
