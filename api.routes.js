import { Router } from "express";

import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController";
import { UpdateProfileController } from "./src/controllers/UpdateProfileController";

import { CreateReportController } from "./src/controllers/CreateReportController";
import { UpdateReportController } from "./src/controllers/UpdateReportController";
import { DeleteReportController } from "./src/controllers/DeleteReportController";

import { CreateCommentInReportController } from "./src/controllers/CreateCommentInReportController";
import { DeleteCommentInReportController } from "./src/controllers/DeleteCommentInReportController";
import { ReadCommentsInReportController } from "./src/controllers/ReadCommentsInReportController";

import { UpdateProfileExperienceController } from "./src/controllers/UpdateProfileExperienceController";

import { ReadProfileController } from "./src/controllers/ReadProfileController";
import { ReadUserController } from "./src/controllers/ReadUserController";

import { ReadProfilesWithFilterController } from "./src/controllers/ReadProfilesWithFilterController";
import { ReadReportsWithFilterController } from "./src/controllers/ReadReportsWithFilterController";

import { UploadImageController, DeleteImageController } from "./src/controllers/api_calls/ImageController"

import { ensureAuthenticated } from "./src/middleware/ensureAuthenticated";

const router = Router();

// Autenticação do Usuário
router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/user", ensureAuthenticated, new ReadUserController().handle);

// Seção de Relatórios
router.post("/report/create", ensureAuthenticated, new CreateReportController().handle)
router.post("/report/update", ensureAuthenticated, new UpdateReportController().handle)
router.post("/report/delete", ensureAuthenticated, new DeleteReportController().handle)

router.post("/report/comments/create", ensureAuthenticated, new CreateCommentInReportController().handle)
router.post("/report/comments/delete", ensureAuthenticated, new DeleteCommentInReportController().handle)
router.post("/report/comments/read", ensureAuthenticated, new ReadCommentsInReportController().handle)

router.post("/reports/search", ensureAuthenticated, new ReadReportsWithFilterController().handle)
router.post("/profiles/search", ensureAuthenticated, new ReadProfilesWithFilterController().handle)


// Seção de Perfil
router.post("/profile", new ReadProfileController().handle);
router.post("/profile/update", ensureAuthenticated, new UpdateProfileController().handle);
router.post("/profile/update/experience", ensureAuthenticated, new UpdateProfileExperienceController().handle);

// Seção de Imagem
router.post("/upload", ensureAuthenticated, new UploadImageController().handle);
router.post("/delete", ensureAuthenticated, new DeleteImageController().handle);

export { router }
