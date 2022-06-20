import { Request, Response } from "express";
import { ReadAdminService } from "../../services/READ/ReadAdminService"

class ReadAdminController {
    async handle(request: Request, response: Response) {
        const service = new ReadAdminService();
        try {
            const result = await service.execute(response, request.params.id, request.body)
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { ReadAdminController }