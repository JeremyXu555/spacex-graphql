import { User } from "./db/models";
import { sign } from "jsonwebtoken";
import {Response} from "express";

export const createAccessToken = (user: User) => {
    return sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
}

export const sendRefreshToken = (res: Response, user: User) => {
    const refreshToken = sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("jid", refreshToken, { httpOnly: true });
}

export interface LoginResponse {
    access_token: string
}
