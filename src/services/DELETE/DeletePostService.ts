import prismaClient from "../../prisma"

class DeletePostService {
    async execute(post_title) {
        try {
            await prismaClient.post.delete({
                where: {
                    title: post_title,
                }
            });
            console.log(`❗📃 O post de título "${post_title}" foi removido com sucesso.`)
        } catch (error) {
            console.log(error)
        }
    }
}

export { DeletePostService }