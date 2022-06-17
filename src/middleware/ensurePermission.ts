import { Request, Response, NextFunction } from "express";

export function ensurePermission(request: Request, response: Response, next: NextFunction) {
    const userAndPassword = request.headers.authorization;

    if (!userAndPassword) {
        return response.status(401).json({
            errorCode: "login.invalid",
        });
    }

    // Basic theduardomaciel:senhamuitosegura
    // [0] Basic
    // [1] 8934589345djisdjfk834u25ndsfksdkf

    const [type, codifiedLogin] = userAndPassword.split(" ");
    console.log(codifiedLogin, process.env.LOGIN_SECRET)

    if (codifiedLogin === process.env.LOGIN_SECRET) {
        return next();
    } else {
        return response.status(401).json({ errorCode: "login.invalid" });
    }
}