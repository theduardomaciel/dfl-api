import { Request, Response } from "express";
import { CreatePostService } from "../../services/CREATE/CreatePostService"

class CreatePostController {
    async handle(request: Request, response: Response) {
        const service = new CreatePostService();
        const result = await service.execute(response, request.body)

        return response.json(result)
    }
}

export { CreatePostController }