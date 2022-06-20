import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensurePermission(request: Request, response: Response, next: NextFunction) {
    const credentials = request.headers.authorization;

    if (!credentials) {
        return response.status(401).json({
            errorCode: "login.invalid",
        });
    }

    // Basic theduardomaciel:senhamuitosegura
    // [0] Basic
    // [1] 8934589345djisdjfk834u25ndsfksdkf

    const [type, codifiedLogin] = credentials.split(" ");

    console.log("Tipo ", type)
    if (type === "Basic") {
        console.log(type, codifiedLogin)
        if (codifiedLogin === process.env.LOGIN_SECRET) {
            console.log("Foi")
            return next();
        } else {
            return response.status(401).json({ errorCode: "login.invalid" });
        }
    } else if (type === "Bearer") {
        try {
            const { sub } = verify(codifiedLogin, process.env.JWT_SECRET_ADMIN) as IPayload;

            request.user_id = sub;

            return next();
        } catch (error) {
            return response.status(401).json({ errorCode: "token.expired" });
        }
    }
}