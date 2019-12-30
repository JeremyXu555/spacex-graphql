import { User } from "./db/models";
import { sign } from "jsonwebtoken";
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { Response } from "express";

export const createTokens = async (user: User) => {
    const accessToken = sign(
        { user: _.pick(user, ["id", "email"]) },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = sign(
        { user: _.pick(user, ["id", "email"]) },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    return [accessToken, refreshToken];
}

export const createAccessToken = (user: User) => {
    return sign(
        { user: _.pick(user, ["email"]) },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
}

export const sendRefreshToken = (res: Response, user: User) => {
    const refreshToken = sign(
        { user: _.pick(user, ["email"]) },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("jid", refreshToken, { httpOnly: true });
}

export const refreshTokens = async (refreshToken: string) => {

    try {
        const payload = jwt.decode(refreshToken) as TokenType;
        const email = payload.user.email;
        const user = await User.findOne({ where: { email: email }, raw: true });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const [newToken, newRefreshToken] = await createTokens(user);

        return {
            user: _.pick(user, ["email"]),
            token: newToken,
            refreshToken: newRefreshToken
        }
    } catch (error) {
        // console.log(error);
        return {};
    }
}


export interface LoginResponse {
    access_token: string
}

export interface TokenType {
    user: {
        id: number,
        email: string,
    }
}
