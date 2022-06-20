import { Response } from "express";
import prismaClient from "../../prisma";

class ReadAdminService {
    async execute(response: Response, email) {
        try {
            const admin = await prismaClient.admin.findUnique({
                where: {
                    email: email,
                },
            })
            if (!admin) {
                response.status(400)
                return {
                    errorMessage: `No admin was found with the given email.`
                }
            }
            const controlledObject = {
                firstName: admin.first_name,
                lastName: admin.last_name,
                image_url: admin.image_url
            }
            return controlledObject;
        } catch (error) {
            console.log(error)
            response.status(400)
            return { errorMessage: error }
        }
    }
}

export { ReadAdminService }