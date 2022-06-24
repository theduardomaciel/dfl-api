import prismaClient from "../../prisma"

class DeletePostService {
    async execute(id) {
        try {
            await prismaClient.post.delete({
                where: {
                    id: id,
                }
            });
            console.log(`❗📃 O post de id ${id}" foi removido com sucesso.`)
        } catch (error) {
            console.log(error)
        }
    }
}

export { DeletePostService }