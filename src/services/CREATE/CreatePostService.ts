import { Response } from "express";
import prismaClient from "../../prisma"

class CreatePostService {
    async execute(response: Response, body) {
        const { title, content, redactor_id } = body
        try {
            const post = await prismaClient.post.create({
                data: {
                    redactor: {
                        connect: {
                            id: redactor_id
                        }
                    },
                    title: title,
                    content: content
                },
            });
            console.log(post, `📃 Post criado pelo redator de ID: ${redactor_id}`)
            return post;
        } catch (error) {
            console.log(error)
            response.status(400)
            return { error }
        }
    }
}

export { CreatePostService }