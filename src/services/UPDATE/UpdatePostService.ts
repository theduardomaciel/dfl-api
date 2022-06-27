import { Response } from "express";
import prismaClient from "../../prisma"

type Props = {
    title: string;
    content: string;
    category: string;
    published: boolean;
    pinned: boolean;
}

class UpdatePostService {
    async execute(response: Response, id: number, params: Props) {
        const { title, content, published, category, pinned } = params;
        try {
            if (content) {
                await prismaClient.post.update({
                    where: {
                        id: id,
                    },
                    data: {
                        content: content
                    }
                });
            }

            if (category) {
                await prismaClient.post.update({
                    where: {
                        id: id,
                    },
                    data: {
                        category: category
                    }
                });
            }

            if (published == true || published === false) {
                await prismaClient.post.update({
                    where: {
                        id: id,
                    },
                    data: {
                        published: published
                    }
                });
            }

            if (pinned === true || pinned === false) {
                await prismaClient.post.update({
                    where: {
                        id: id,
                    },
                    data: {
                        pinned: pinned
                    }
                });
            }

            // !!!!!! = a mudança de título deve sempre vir por último por motivos óbvios
            if (title) {
                await prismaClient.post.update({
                    where: {
                        id: id,
                    },
                    data: {
                        title: title
                    }
                });
            }

            const post = await prismaClient.post.findUnique({
                where: {
                    id: id,
                },
                include: {
                    redactor: true,
                }
            });

            if (post) {
                console.log(`📃 Post de id ${id} atualizado com sucesso!`);
                return post;
            } else {
                console.log("❌ Ocorreu um erro ao tentar atualizar o post.")
            }
        } catch (error) {
            console.log(error, "The id provided does not belong to a post.");
            response.status(400)
            return { errorMessage: "The id provided does not belong to a post." }
        }
    }
}

export { UpdatePostService }