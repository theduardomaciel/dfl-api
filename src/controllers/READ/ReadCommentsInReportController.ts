import { Request, Response } from "express";
import { ReadCommentsInReportService } from "../../services/READ/ReadCommentsInReportService"

class ReadCommentsInReportController {
    async handle(request: Request, response: Response) {
        const service = new ReadCommentsInReportService();
        try {
            const result = await service.execute(parseInt(request.params.id))
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { ReadCommentsInReportController }