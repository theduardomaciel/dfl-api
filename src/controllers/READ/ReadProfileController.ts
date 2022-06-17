import { Request, Response } from "express";
import { ReadProfileService } from "../../services/READ/ReadProfileService"

class ReadProfileController {
    async handle(request: Request, response: Response) {
        const service = new ReadProfileService();
        try {
            const result = await service.execute(response, parseInt(request.params.profile_id), request.query)
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { ReadProfileController }