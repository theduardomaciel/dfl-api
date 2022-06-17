import { Router } from "express";

import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController";

import { CreateReportController } from "./src/controllers/CREATE/CreateReportController";
import { CreateCommentInReportController } from "./src/controllers/CREATE/CreateCommentInReportController";

import { ReadProfileController } from "./src/controllers/READ/ReadProfileController";
import { ReadUserController } from "./src/controllers/READ/ReadUserController";
import { ReadCommentsInReportController } from "./src/controllers/READ/ReadCommentsInReportController";
import { ReadReportController } from "./src/controllers/READ/ReadReportController";

import { UpdateReportController } from "./src/controllers/UPDATE/UpdateReportController";
import { UpdateProfileController } from "./src/controllers/UPDATE/UpdateProfileController";
import { UpdateProfileExperienceController } from "./src/controllers/UPDATE/UpdateProfileExperienceController";

import { DeleteReportController } from "./src/controllers/DELETE/DeleteReportController";
import { DeleteCommentInReportController } from "./src/controllers/DELETE/DeleteCommentInReportController";

import { UploadImageController, DeleteImageController } from "./src/controllers/api_calls/ImageController"

import { ensureAuthenticated } from "./src/middleware/ensureAuthenticated";
import { ensurePermission } from "./src/middleware/ensurePermission";

const router = Router();

// Autenticação do Usuário
router.post("/authenticate", new AuthenticateUserController().handle);
router.get("/user/:user_id", ensurePermission, new ReadUserController().handle);

// Seção de Relatórios
router.get("/report/:report_id", new ReadReportController().handle)
router.post("/report", ensureAuthenticated, new CreateReportController().handle)
router.patch("/report/:report_id", ensureAuthenticated, new UpdateReportController().handle)
router.delete("/report/:report_id", ensureAuthenticated, new DeleteReportController().handle)

// Seção de Comentários dos Relatórios
router.post("/report/:report_id/comments", ensureAuthenticated, new CreateCommentInReportController().handle)
router.delete("/report/:report_id/comments/:comment_id", ensureAuthenticated, new DeleteCommentInReportController().handle)
router.get("/report/:report_id/comments", ensureAuthenticated, new ReadCommentsInReportController().handle)

// Seção de Perfil
router.get("/profile/:profile_id", new ReadProfileController().handle);
router.patch("/profile/:profile_id", ensureAuthenticated, new UpdateProfileController().handle);
router.patch("/profile/:profile_id/experience", ensureAuthenticated, new UpdateProfileExperienceController().handle);

// Seção de Imagem
router.post("/upload", ensureAuthenticated, new UploadImageController().handle);
router.delete("/delete", ensureAuthenticated, new DeleteImageController().handle);

export { router }