import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
import { UploadImageService } from "./api_calls/ImageService";

/* 
    - Recuperar informações do usuário na Google
    - Verificamos se o usuário existe no banco de dados
    - Se SIM = enviamos os dados da conta do usuário
    - Se NÃO = criamos o usuário com os dados da Google e enviamos os dados da conta recém-criada
*/

require('dotenv').config()

class AuthenticateAdminService {
    async execute(body) {
        const { firstName, lastName, image_url, password, email, role } = body;

        let admin;
        admin = await prismaClient.admin.findUnique({
            where: {
                email: email
            }
        })

        if (!admin) {
            const roleSecured = role ? role : "colector"

            const service = new UploadImageService();
            const { images, deleteHashs } = await service.execute([image_url.split("data:image/jpeg;base64,")[1]], role)
            if (images[0]) { console.log("Admin profile image uploaded with success!") } else { console.log("❌ There wasn't possible to upload profile image.") }

            try {
                admin = await prismaClient.admin.create({
                    data: {
                        email: email,
                        first_name: firstName,
                        image_url: images[0] ? images[0] : "https://blog.megajogos.com.br/wp-content/uploads/2018/07/no-image.jpg",
                        last_name: lastName,
                        role: roleSecured,
                        password: password ? password : "e87d1ab34ebb528a4d5e8d4b4f2610e8",
                    }
                })
                console.log(admin, `🏗️ Administrador criado com sucesso.`)
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log(admin, "🏗️ Administrador logado com sucesso!")
        }

        const token = sign({
            admin: { id: admin.id },
        }, process.env.JWT_SECRET_ADMIN, { subject: admin.id, expiresIn: "240d", audience: "dashboard-admin" });

        return { token, admin };
    }
}

export { AuthenticateAdminService }