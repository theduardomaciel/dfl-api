import { Request, Response } from "express";
import { DeletePostService } from "../../services/DELETE/DeletePostService"

class DeletePostController {
    async handle(request: Request, response: Response) {
        const service = new DeletePostService();
        const result = await service.execute(parseInt(request.params.id))

        return response.json(result)
    }
}

export { DeletePostController }