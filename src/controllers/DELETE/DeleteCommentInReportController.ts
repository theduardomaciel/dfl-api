import { Request, Response } from "express";
import { DeleteCommentInReportService } from "../../services/DELETE/DeleteCommentInReportService"

class DeleteCommentInReportController {
    async handle(request: Request, response: Response) {
        const id = parseInt(request.params.id);

        const service = new DeleteCommentInReportService();
        const result = await service.execute(id)

        return response.json(result)
    }
}

export { DeleteCommentInReportController }