import { Request, Response } from "express";
import { UpdateProfileService } from "../../services/UPDATE/UpdateProfileService"

class UpdateProfileController {
    async handle(request: Request, response: Response) {
        const service = new UpdateProfileService();
        const result = await service.execute(parseInt(request.params.profile_id), request.body)

        return response.json(result)
    }
}

export { UpdateProfileController }