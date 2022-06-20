import { Response } from "express";
import prismaClient from "../../prisma";

class ReadPostService {
    async execute(response?: Response, post_title?, filters?) {
        if (post_title) {
            try {
                const profile = await prismaClient.post.findUnique({
                    where: {
                        title: post_title,
                    },
                    include: {
                        redactor: true
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
            const { content, draft, searchCount } = filters;
            try {
                if (content) {
                    const posts = await prismaClient.post.findMany({
                        where: {
                            OR: [
                                {
                                    content: {
                                        contains: content,
                                    }
                                },
                                {
                                    draft: draft
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
                response.status(400)
                return error
            }
        }
    }
}

export { ReadPostService }