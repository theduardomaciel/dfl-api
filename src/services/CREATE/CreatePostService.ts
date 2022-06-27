import { Response } from "express";
import prismaClient from "../../prisma"

class CreatePostService {
    async execute(response: Response, body) {
        const { title, content, category, redactor_id } = body
        try {
            const post = await prismaClient.post.create({
                data: {
                    redactor: {
                        connect: {
                            id: redactor_id
                        }
                    },
                    title: title,
                    content: content,
                    category: category
                },
            });
            console.log(post, `📃 Post criado pelo redator de ID: ${redactor_id}`)
            return post;
        } catch (error) {
            console.log(error)
            response.status(500)
            return { error }
        }
    }
}

export { CreatePostService }