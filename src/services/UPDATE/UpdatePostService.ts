import { Response } from "express";
import prismaClient from "../../prisma"

type Props = {
    title: string;
    content: string;
    draft: boolean;
    fixed: boolean;
}

class UpdatePostService {
    async execute(response: Response, originalTitle: string, params: Props) {
        const { title, content, draft, fixed } = params;
        try {
            if (content) {
                await prismaClient.post.update({
                    where: {
                        title: originalTitle,
                    },
                    data: {
                        content: content
                    }
                });
            }

            if (draft == true || draft === false) {
                await prismaClient.post.update({
                    where: {
                        title: originalTitle,
                    },
                    data: {
                        draft: draft
                    }
                });
            }

            if (fixed === true || fixed === false) {
                await prismaClient.post.update({
                    where: {
                        title: originalTitle,
                    },
                    data: {
                        fixed: fixed
                    }
                });
            }

            // !!!!!! = a mudança de título deve sempre vir por último por motivos óbvios
            if (title) {
                await prismaClient.post.update({
                    where: {
                        title: originalTitle,
                    },
                    data: {
                        title: title
                    }
                });
            }

            const post = await prismaClient.post.findUnique({
                where: {
                    title: title ? title : originalTitle,
                },
            });

            if (post) {
                console.log(`📃 Post atualizado com sucesso!`);
                return post;
            } else {
                console.log("❌ Ocorreu um erro ao tentar atualizar o post.")
            }
        } catch (error) {
            console.log(error);
            response.status(400)
            return { errorMessage: "The id (title) provided does not belong to a post." }
        }
    }
}

export { UpdatePostService }