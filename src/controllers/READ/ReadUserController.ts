import { Request, Response } from "express";
import { ReadUserService } from "../../services/READ/ReadUserService"

class ReadUserController {
    async handle(request: Request, response: Response) {
        const service = new ReadUserService();
        try {
            const result = await service.execute(response, request.params.user_id)
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { ReadUserController }