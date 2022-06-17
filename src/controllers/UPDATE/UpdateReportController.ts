import { Request, Response } from "express";
import { UpdateReportService } from "../../services/UPDATE/UpdateReportService"

class UpdateReportController {
    async handle(request: Request, response: Response) {
        const service = new UpdateReportService();
        const result = await service.execute(parseInt(request.params.report_id), request.body)

        return response.json(result)
    }
}

export { UpdateReportController }