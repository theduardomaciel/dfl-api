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

import { AuthenticateAdminController } from "./src/controllers/AuthenticateAdminController";
import { ReadAdminController } from "./src/controllers/READ/ReadAdminController";
import { DeleteAdminController } from "./src/controllers/DELETE/DeleteAdminController";

import { ReadPostController } from "./src/controllers/READ/ReadPostController";
import { CreatePostController } from "./src/controllers/CREATE/CreatePostController";
import { UpdatePostController } from "./src/controllers/UPDATE/UpdatePostController";
import { DeletePostController } from "./src/controllers/DELETE/DeletePostController";

const router = Router();

// Autenticação do Usuário
router.post("/authenticate", new AuthenticateUserController().handle);
router.get("/user/:user_id", ensurePermission, new ReadUserController().handle);

// Relatórios
router.get("/report/:report_id", new ReadReportController().handle)
router.get("/report", new ReadReportController().handle)
router.post("/report", ensureAuthenticated, new CreateReportController().handle)
router.patch("/report/:report_id", ensureAuthenticated, new UpdateReportController().handle)
router.delete("/report/:report_id", ensureAuthenticated, new DeleteReportController().handle)
/* Comentários */
router.post("/report/:report_id/comment", ensureAuthenticated, new CreateCommentInReportController().handle)
router.delete("/report/:report_id/comment/:comment_id", ensureAuthenticated, new DeleteCommentInReportController().handle)
router.get("/report/:report_id/comments", ensureAuthenticated, new ReadCommentsInReportController().handle)

// Perfil
router.get("/profile", new ReadProfileController().handle);
router.get("/profile/:profile_id", new ReadProfileController().handle);
router.patch("/profile/:profile_id", ensureAuthenticated, new UpdateProfileController().handle);
router.patch("/profile/:profile_id/experience", ensureAuthenticated, new UpdateProfileExperienceController().handle);

// Admin
router.post("/authenticate/admin", ensurePermission, new AuthenticateAdminController().handle);
router.post("/admin", new ReadAdminController().handle);
router.get("/admin/:admin_id", new ReadAdminController().handle);
router.delete("/admin/:admin_id", ensurePermission, new DeleteAdminController().handle);

// Blog
router.get("/post/:id", new ReadPostController().handle);
router.get("/post", new ReadPostController().handle);
router.post("/post", ensurePermission, new CreatePostController().handle);
router.patch("/post/:id", ensurePermission, new UpdatePostController().handle)
router.delete("/post/:id", ensurePermission, new DeletePostController().handle)

// Imagem
router.post("/upload", ensureAuthenticated, new UploadImageController().handle);
router.delete("/delete", ensureAuthenticated, new DeleteImageController().handle);

router.get('/', (req, res) => {
    return res.send('3');
});

export { router }