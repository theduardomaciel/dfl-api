import { Response } from "express";
import prismaClient from "../../prisma"

class CreateCommentInReportService {
    async execute(response: Response, profile_id, report_id, content) {
        try {
            const comment = await prismaClient.comment.create({
                data: {
                    profile: {
                        connect: {
                            id: parseInt(profile_id)
                        }
                    },
                    report: {
                        connect: {
                            id: parseInt(report_id)
                        }
                    },
                    content: content
                },
                include: {
                    profile: true
                }
            });
            console.log(comment, `💭 Comentário criado pelo perfil de ID: ${profile_id} com sucesso no relatório de ID: ${report_id}.`)
            return comment;
        } catch (error) {
            console.log(error)
            response.status(500)
            return { error: error }
        }
    }
}

export { CreateCommentInReportService }