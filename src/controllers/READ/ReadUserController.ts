import { Request, Response } from "express";
import { ReadUserService } from "../../services/read/ReadUserService"

class ReadUserController {
    async handle(request: Request, response: Response) {
        const service = new ReadUserService();
        try {
            const result = await service.execute(request.params.user_id)
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { ReadUserController }