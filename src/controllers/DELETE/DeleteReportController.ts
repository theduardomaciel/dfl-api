import { Request, Response } from "express";
import { DeleteReportService } from "../../services/DELETE/DeleteReportService"

class DeleteReportController {
    async handle(request: Request, response: Response) {
        const id = parseInt(request.params.report_id);

        const service = new DeleteReportService();
        const result = await service.execute(id)

        return response.json(result)
    }
}

export { DeleteReportController }