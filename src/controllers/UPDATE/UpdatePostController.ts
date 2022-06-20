import { Request, Response } from "express";
import { UpdatePostService } from "../../services/UPDATE/UpdatePostService"

class UpdatePostController {
    async handle(request: Request, response: Response) {
        const service = new UpdatePostService();
        try {
            const result = await service.execute(request.params.id, request.body)
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { UpdatePostController }