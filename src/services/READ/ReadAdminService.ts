import { Response } from "express";
import prismaClient from "../../prisma";

class ReadAdminService {
    async execute(response: Response, id, body) {
        try {
            const { email } = body;
            let admin;
            if (id) {
                admin = await prismaClient.admin.findUnique({
                    where: {
                        id: id,
                    },
                    select: {
                        first_name: true,
                        last_name: true,
                        image_url: true,
                        role: true
                    }
                })
            } else {
                admin = await prismaClient.admin.findUnique({
                    where: {
                        email: email,
                    },
                    select: {
                        first_name: true,
                        last_name: true,
                        image_url: true,
                        role: true
                    }
                })
            }
            if (!admin) {
                response.status(400)
                return {
                    errorMessage: `No admin was found with the given id.`
                }
            }
            return admin;
        } catch (error) {
            console.log(error)
            response.status(500)
            return { errorMessage: error }
        }
    }
}

export { ReadAdminService }