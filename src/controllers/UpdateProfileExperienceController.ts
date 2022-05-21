import { Request, Response } from "express";
import { UpdateProfileExperienceService } from "../services/UpdateProfileExperienceService"

class UpdateProfileExperienceController {
    async handle(request: Request, response: Response) {
        const { profile_id } = request.body;

        const service = new UpdateProfileExperienceService();
        try {
            const result = await service.execute(profile_id)
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { UpdateProfileExperienceController }