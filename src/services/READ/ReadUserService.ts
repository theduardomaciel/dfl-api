import { Response } from "express";
import prismaClient from "../../prisma";

class ReadUserService {
    async execute(response: Response, user_id) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: user_id,
                },
                include: {
                    profile: {
                        include: {
                            reports: true
                        }
                    }
                }
            })
            if (!user) {
                response.status(400)
                return {
                    errorMessage: `No user was found with the given id. Remember the user id is a UUID (ex.: bc883e16-3855-413d-b8c6-969b88bc9fac)`
                }
            }
            return user;
        } catch (error) {
            console.log(error)
            response.status(500)
            return { errorMessage: error }
        }
    }
}

export { ReadUserService }