import { Request, Response } from 'express';
import { Redis } from "ioredis";

interface Session extends Express.Session {
    userId?: string
}

export interface SpaceXContext {
    req: Request,
    res: Response,
    redis: Redis,
    session: Session,
}
