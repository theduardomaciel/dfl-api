import { Response } from "express";
import prismaClient from "../../prisma";

class ReadProfileService {
    async execute(response?: Response, profile_id?, filters?) {
        if (profile_id) {
            try {
                const profile = await prismaClient.profile.findUnique({
                    where: {
                        id: profile_id,
                    },
                    include: {
                        reports: true
                    }
                })
                console.log(profile, "Perfil do usuário retornado com sucesso.")
                return profile;
            } catch (error) {
                console.log(error)
                response.status(400)
                return { errorCode: "database.error" }
            }
        } else {
            const { location, username, exclusionsId, searchCount } = filters;
            try {
                const profile = await prismaClient.profile.findMany({
                    where: {
                        OR: [
                            {
                                username: username && username
                            },
                            {
                                defaultCity: location && location,
                            }
                        ],
                        NOT: [
                            {
                                id: exclusionsId
                            }
                        ]
                    },
                    include: {
                        reports: true
                    },
                    take: searchCount && searchCount
                })
                return profile;
            } catch (error) {
                console.log(error)
                response.status(400)
                return error
            }
        }
    }
}

export { ReadProfileService }