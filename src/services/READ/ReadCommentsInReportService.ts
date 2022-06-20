import { Response } from "express";
import prismaClient from "../../prisma";

class ReadCommentsInReportService {
    async execute(response: Response, report_id) {
        try {
            const comments = await prismaClient.comment.findMany({
                where: {
                    report_id: report_id
                },
                include: {
                    profile: true,
                }
            })
            console.log(`Comentários do relatório de ID: ${report_id} foram encontrados! (${comments.length})`)
            return comments;
        } catch (error) {
            response.status(500)
            console.log(error)
            return { error: error }
        }
    }
}

export { ReadCommentsInReportService }