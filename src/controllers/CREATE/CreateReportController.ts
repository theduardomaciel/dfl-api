import { Request, Response } from "express";
import { CreateReportService } from "../../services/CREATE/CreateReportService"

class CreateReportController {
    async handle(request: Request, response: Response) {
        const service = new CreateReportService();
        const result = await service.execute(response, request.body)

        return response.json(result)
    }
}

export { CreateReportController }