import { Request, Response } from "express";
import { ReadReportService } from "../../services/READ/ReadReportService"

class ReadReportController {
    async handle(request: Request, response: Response) {
        const service = new ReadReportService();
        try {
            const result = await service.execute(response, parseInt(request.params.report_id), request.query)
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { ReadReportController }