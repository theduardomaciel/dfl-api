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
            const { redactorId, content, published, pinned, searchCount } = filters;
            try {
                if (content) {
                    const posts = await prismaClient.post.findMany({
                        where: {
                            AND: [
                                {
                                    content: {
                                        contains: content ? content : "",
                                    }
                                },
                                {
                                    published: published && published,
                                },
                                {
                                    redactor: {
                                        id: redactorId ? redactorId : "",
                                    }
                                },
                                {
                                    pinned: pinned && pinned,
                                }
                            ]
                        },
                        include: {
                            redactor: true
                        },
                        take: searchCount && parseInt(searchCount)
                    })
                    return posts;
                } else {
                    const posts = await prismaClient.post.findMany({
                        include: {
                            redactor: true
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