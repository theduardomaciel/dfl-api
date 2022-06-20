import { Request, Response } from "express";
import { ReadPostService } from "../../services/READ/ReadPostService"

class ReadPostController {
    async handle(request: Request, response: Response) {
        const service = new ReadPostService();
        try {
            const result = await service.execute(response, request.params.id)
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { ReadPostController }