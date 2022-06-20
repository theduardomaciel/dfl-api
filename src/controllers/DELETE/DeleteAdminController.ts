import { Request, Response } from "express";
import { DeleteAdminService } from "../../services/DELETE/DeleteAdminService"

class DeleteAdminController {
    async handle(request: Request, response: Response) {
        const id = parseInt(request.params.id);

        const service = new DeleteAdminService();
        const result = await service.execute(id)

        return response.json(result)
    }
}

export { DeleteAdminController }