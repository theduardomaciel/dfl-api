import { Request, Response } from "express";
import { CreateReportService } from "../services/CreateReportService"

class CreateReportController {
    async handle(request: Request, response: Response) {
        const {
            profile_id,
            address,
            coordinates,
            images_urls,
            images_deleteHashs,
            tags,
            suggestion,
            hasTrashBins
        } = request.body;
        console.log(request.body)

        const service = new CreateReportService();
        const result = await service.execute(
            profile_id,
            address,
            coordinates,
            images_urls,
            images_deleteHashs,
            tags,
            suggestion,
            hasTrashBins
        )

        return response.json(result)
    }
}

export { CreateReportController }