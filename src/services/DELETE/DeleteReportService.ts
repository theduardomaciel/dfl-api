import prismaClient from "../../prisma"
import { DeleteImageService } from "../api_calls/ImageService";

class DeleteReportService {
    async execute(report_id) {
        try {
            const report = await prismaClient.report.findUnique({
                where: {
                    id: report_id
                }
            })

            const image_deleteHashs = report.images_deleteHashs

            const result = await prismaClient.report.delete({
                where: {
                    id: report_id
                },
            })
            console.log("🗑️ Relatório removido do banco de dados com sucesso!")
            const service = new DeleteImageService();
            try {
                await service.execute(image_deleteHashs)
                console.log("🤳 Imagem(ns) do relatório removida(s) do imgur com sucesso!")
            } catch (error) {
                console.log(error)
            }
            return result;
        } catch (error) {
            console.log(error)
            return "error"
        }
    }
}

export { DeleteReportService }