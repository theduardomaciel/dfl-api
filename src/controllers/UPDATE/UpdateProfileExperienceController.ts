import { Request, Response } from "express";
import { UpdateProfileExperienceService } from "../../services/UPDATE/UpdateProfileExperienceService"

class UpdateProfileExperienceController {
    async handle(request: Request, response: Response) {
        const service = new UpdateProfileExperienceService();
        try {
            const result = await service.execute(parseInt(request.params.profile_id))
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { UpdateProfileExperienceController }