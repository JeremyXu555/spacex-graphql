import { Request, Response } from "express";
import { User } from "../db/models";
import { redis } from "../reids";

export const confirmEmail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = await redis.get(id);

    if (userId) {
        await User.update({ confirmed: true }, { where: { id: userId } });
        await redis.del(id);
        res.send("ok");
    } else {
        res.send("Invalid user");
    }
};
