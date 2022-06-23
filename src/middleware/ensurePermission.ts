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

    if (type === "Basic") {
        if (codifiedLogin === process.env.LOGIN_SECRET) {
            return next();
        } else {
            return response.status(401).json({ errorCode: "login.invalid" });
        }
    } else if (type === "Bearer") {
        try {
            console.log(codifiedLogin)
            const { sub } = verify(codifiedLogin, process.env.JWT_SECRET_ADMIN) as IPayload;
            console.log(sub)

            request.admin_id = sub;

            return next();
        } catch (error) {
            console.log(error)
            return response.status(401).json({ errorCode: "token.expired" });
        }
    }
}