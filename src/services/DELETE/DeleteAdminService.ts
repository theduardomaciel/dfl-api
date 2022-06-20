import prismaClient from "../../prisma"

class DeleteAdminService {
    async execute(admin_id) {
        try {
            await prismaClient.admin.delete({
                where: {
                    id: admin_id
                }
            });
            console.log(`❗Administrador de ID: ${admin_id} removido com sucesso.`)
        } catch (error) {
            console.log(error)
        }
    }
}

export { DeleteAdminService }