import { compare } from "bcryptjs";
import { prisma } from "../utils/prisma";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

export class AuthController {

    async authUser(request: Request, response: Response) {

        const body = request.body;
        let responseStatus;

        try {
            const scrPrvKey = String(process.env.SECRET_PRIVATE_KEY);

            //seleciona o usuario atraves do e-mail recebido
            const userByEmail = await prisma.user.findUniqueOrThrow({
                where: {
                    email_usu: body.email_usu
                }
            })

            //transforma a senha em hash
            let isValidPassword = await compare(body.paswrd_usu, userByEmail.paswrd_usu);

            if (!isValidPassword) {
                responseStatus = response.status(401).json("Invalid password.");
            } else {
                const authToken = sign({ id: userByEmail.id_usu }, scrPrvKey, { expiresIn: "1d" });
                let id = userByEmail.id_usu;
                let email = userByEmail.email_usu;
                responseStatus = response.status(200).json({ user: { id, email }, authToken });
            }

        } catch (error: any) {
            if (error == "NotFoundError: No User found") {
                responseStatus = response.status(404).json("User not found.");
            } else {
                responseStatus = response.status(500).json("An Internal Error has Occurred.");
            }
        }
        return responseStatus;
    }

}