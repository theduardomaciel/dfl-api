import { Response } from "express";
import prismaClient from "../../prisma";

class ReadPostService {
    async execute(response?: Response, id?, filters?) {
        if (id) {
            try {
                const profile = await prismaClient.post.findUnique({
                    where: {
                        id: id,
                    },
                    include: {
                        redactor: {
                            select: {
                                first_name: true,
                                last_name: true,
                                image_url: true,
                                role: true
                            }
                        }
                    }
                })
                console.log(profile, "Dados do post retornados com sucesso.")
                return profile;
            } catch (error) {
                console.log(error)
                response.status(400)
                return { errorCode: "database.error" }
            }
        } else {
            const { redactorId, content, title, published, pinned, searchCount } = filters;
            const pinnedBoolean = (pinned === 'true');
            const publishedBoolean = (published === 'true');
            try {
                if (filters) {
                    console.log("Retornando posts com filtros.")
                    const posts = await prismaClient.post.findMany({
                        where: {
                            AND: [
                                {
                                    content: {
                                        contains: content,
                                    }
                                },
                                {
                                    title: {
                                        contains: title,
                                    }
                                },
                                {
                                    published: published && publishedBoolean,
                                },
                                {
                                    redactor: {
                                        id: redactorId,
                                    }
                                },
                                {
                                    pinned: pinned && pinnedBoolean,
                                }
                            ]
                        },
                        include: {
                            redactor: {
                                select: {
                                    first_name: true,
                                    last_name: true,
                                    image_url: true,
                                    role: true
                                }
                            }
                        },
                        take: searchCount && parseInt(searchCount)
                    })
                    return posts;
                } else {
                    const posts = await prismaClient.post.findMany({
                        include: {
                            redactor: {
                                select: {
                                    first_name: true,
                                    last_name: true,
                                    image_url: true,
                                    role: true
                                }
                            }
                        },
                        take: searchCount && parseInt(searchCount)
                    })
                    return posts;
                }
            } catch (error) {
                console.log(error)
                response.status(500)
                return error
            }
        }
    }
}

export { ReadPostService }