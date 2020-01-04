import { User } from "../models";
import { hash, compare } from "bcryptjs";
import {
    createAccessToken,
    LoginResponse,
    sendRefreshToken
} from "../../auth";
import { SpaceXContext } from "../../types/SpaceXContext";
import { createEmailConfirmationLink } from "../../utilities/createEmailLinks";
import { v4 } from "uuid";
import { redis } from "../../reids";
import { sendEmail } from "../../utilities/sendEmail";
import { userSessionPrefix } from "../../utilities/constants";

export const userController = {
    users: () => User.findAll(),

    createUser: async (user: User, context: SpaceXContext) => {
        const userExisted = await User.findOne({ where: { email: user.email } });
        if (userExisted) throw new Error(`${user.email} already exists`);

        const hashedPassword = await hash(user.password, 12);
        const userNew = await User.create({
            id: v4(),
            email: user.email,
            password: hashedPassword,
        });

        const url = context.req.protocol + "://" + context.req.get("host");
        const link = await createEmailConfirmationLink(url, userNew.id, redis);

        await sendEmail(user.email, link);

        return userNew;
    },

    deactivate_user: async (user: User) => {
        try {
            User.destroy({ where: { email: user.email } });
            return { message: `Email of ${user.email} has been deleted!` };
        } catch (Error) {
            return { message: Error as string };
        }
    },

    login: async (user: User, context: SpaceXContext): Promise<LoginResponse> => {
        const user_db = await User.findOne({ where: { email: user.email } });
        if (!user_db) {
            throw new Error("Could not find the user");
        }

        const valid = await compare(user.password, user_db.password);
        if (!valid) {
            throw new Error("Wrong password");
        }

        // sendRefreshToken(context.res, user);
        const session = context.req.session;
        session.userId = user_db.id;

        if (context.req.sessionID) {
            await context.redis.lpush(`${userSessionPrefix}${user_db.id}`, context.req.sessionID);
        }

        return {
            // access_token: createAccessToken(user)
            access_token: 'token'
        }
    }
};
