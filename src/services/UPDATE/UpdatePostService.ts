import prismaClient from "../../prisma"

type Props = {
    title: string;
    content: string;
    draft: boolean;
    fixed: boolean;
}

class UpdatePostService {
    async execute(originalTitle: string, params: Props) {
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

            if (draft !== undefined) {
                await prismaClient.post.update({
                    where: {
                        title: originalTitle,
                    },
                    data: {
                        draft: draft
                    }
                });
            }

            if (fixed !== undefined) {
                await prismaClient.post.update({
                    where: {
                        title: originalTitle,
                    },
                    data: {
                        draft: fixed
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
        }
    }
}

export { UpdatePostService }