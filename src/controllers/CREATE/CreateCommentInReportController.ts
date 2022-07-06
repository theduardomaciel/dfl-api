import { Request, Response } from "express";
import { CreateCommentInReportService } from "../../services/CREATE/CreateCommentInReportService"

class CreateCommentInReportController {
    async handle(request: Request, response: Response) {
        const {
            profile_id,
            content
        } = request.body;

        const service = new CreateCommentInReportService();
        const result = await service.execute(response, parseInt(profile_id), parseInt(request.params.report_id), content)

        return response.json(result)
    }
}

export { CreateCommentInReportController }