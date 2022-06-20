import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

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
            admin = await prismaClient.admin.create({
                data: {
                    email: email,
                    first_name: firstName,
                    image_url: image_url,
                    last_name: lastName,
                    role: role ? role : "colector",
                    password: password ? password : "e87d1ab34ebb528a4d5e8d4b4f2610e8", //equivale a dashboard-dfl em hash md5
                }
            })
            console.log(admin, `🏗️ Administrador de cargo: ${admin.role} criado com sucesso.`)
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