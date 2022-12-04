import { NextFunction, Request, Response, Router } from "express";
import { verify } from "jsonwebtoken";
import { sendMsgSrv } from "../routes/Routes";

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
}

export function authMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { authorization } = request.headers;
    let responseStatus;

    const token = authorization?.replace("Bearer ", '');

    if (!authorization) {
        responseStatus = response.status(401).json({ error: "User not authenticated." });
    }

    try {

        const scrPrvKey = String(process.env.SECRET_PRIVATE_KEY);
        const decoded = verify(String(token), scrPrvKey)
        const { id } = decoded as TokenPayload;

        request.body.id = id;
        next();

    } catch (error) {
        if (error == "JsonWebTokenError: invalid token") {
            responseStatus = response.status(401).json({ error: "Invalid token." });
        } else {
            responseStatus = response.status(500).json({ error: "An Internal Error has Occurred." });
        }
    }

    return responseStatus;
}