import { User } from "../models";
import { hash, compare } from "bcryptjs";
import {
    createAccessToken,
    LoginResponse,
    sendRefreshToken
} from "../../auth";
import { MyContext } from "../../MyContext";


export const userController = {
    users: () => User.findAll(),

    createUser: async (user: User, context: MyContext) => {
        const hashedPassword = await hash(user.password, 12);
        return User
            .findOrCreate({
                where: {
                    email: user.email,
                    password: hashedPassword,
                }
            })
            .then(([user]) => {
                return user.get({ plain: true });
            });
    },

    login: async (user: User, context: MyContext): Promise<LoginResponse> => {
        const user_db = await User.findOne({ where: { email: user.email } });
        if (!user_db) {
            throw new Error("Could not find the user");
        }

        const valid = await compare(user.password, user_db.password);
        if (!valid) {
            throw new Error("Wrong password");
        }

        sendRefreshToken(context.res, user);

        return {
            access_token: createAccessToken(user)
        }
    }
};
