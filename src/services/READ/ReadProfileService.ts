import prismaClient from "../../prisma";

class ReadProfileService {
    async execute(profile_id, filters?) {
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
                return profile;
            } catch (error) {
                console.log(error)
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
            }
        }
    }
}

export { ReadProfileService }