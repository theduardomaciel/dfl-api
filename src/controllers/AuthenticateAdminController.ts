import { Request, Response } from "express";
import { AuthenticateAdminService } from "../services/AuthenticateAdminService"

class AuthenticateAdminController {
    async handle(request: Request, response: Response) {
        const service = new AuthenticateAdminService();
        try {
            const result = await service.execute(request.body)
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { AuthenticateAdminController }