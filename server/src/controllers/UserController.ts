import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { prisma } from "../utils/prisma";
import { sendMsgSrv } from "../routes/Routes";


export class UserController {

    async storeUser(request: Request, response: Response) {

        const body = request.body;
        let responseStatus;

        //transforma a senha em hash
        let hashPassword = await hash(body.paswrd_usu, 8);

        try {

            await prisma.user.create({
                data: {
                    login_usu: body.login_usu,
                    paswrd_usu: hashPassword,
                    name_usu: body.name_usu,
                    email_usu: body.email_usu,
                    emaver_usu: false,
                    vercod_usu: Math.floor(Math.random() * 999999) - 100000,
                    celnum_usu: body.celnum_usu
                }
            })

            responseStatus = response.status(201).json("User successfully created.");

            //Envia o e-mail de verificação
            sendMsgSrv.sendVerifMessageService(body.email_usu)

        } catch (error: any) {

            if (error['code'] == "P2002") {
                if (error['meta']['target'] == "login_usu") {
                    responseStatus = response.status(409).json("The username " + body.login_usu + " is already in use.");
                } else if (error['meta']['target'] == "email_usu") {
                    responseStatus = response.status(409).json("This e-mail is already in use.");
                } else if (error['meta']['target'] == "celnum_usu") {
                    responseStatus = response.status(409).json("This phone number is already in use.");
                }
            } else {
                responseStatus = response.status(500).json("An Internal Error has Occurred.");
            }
        }

        return responseStatus;
    }

    async indexUsers(request: Request, response: Response) {

        let responseMsg;

        try {
            const users = await prisma.user.findMany({
                select: {
                    id_usu: true,
                    login_usu: true,
                    name_usu: true,
                    email_usu: true,
                    celnum_usu: true,
                    emaver_usu: true,
                    dahins_usu: true
                },
                orderBy: {
                    dahins_usu: 'desc'
                }
            })

            responseMsg = response.status(200).json([users]);

            if (!users) {
                responseMsg = response.status(404).json("Not found users.");
            }
        } catch (error) {
            responseMsg = response.status(500).json("An Internal Error has Occurred.");
        }
        return responseMsg;
    }

    async indexUserById(request: Request, response: Response) {
        const body = request.body;
        const idUser = body.id_usu;
        let responseMsg;

        try {

            const userById = await prisma.user.findUniqueOrThrow({
                select: {
                    login_usu: true,
                    name_usu: true,
                    email_usu: true,
                    celnum_usu: true,
                    dahins_usu: true
                },
                where: {
                    id_usu: idUser
                }
            })

            responseMsg = response.status(200).json([userById]);

        } catch (error) {
            console.log(error)
            if (error == 'NotFoundError: No User found') {
                responseMsg = response.status(404).json("User not found");
            } else {
                responseMsg = response.status(500).json("An Internal Error has Occurred.");
            }
        }

        return responseMsg;
    }

    async alterUser(request: Request, response: Response) {

        const body = request.body;
        const idUser = request.body.id;
        console.log(body)
        let responseStatus;

        //recebe a coluna para realizar o update 
        async function updateColumn(decodedIdUser: string, data: {}) {
            await prisma.user.update({
                where: {
                    id_usu: decodedIdUser
                },
                data
            });
        };

        //seleciona a coluna onde deve ser feito o update
        try {

            if (body.paswrd_usu) {
                let data = {
                    paswrd_usu: body.paswrd_usu
                };

                updateColumn(idUser, data);
                responseStatus = response.status(200).json("Password successfully changed.");

            } else if (body.email_usu) {
                let data = {
                    email_usu: body.email_usu
                };

                await updateColumn(idUser, data);
                responseStatus = response.status(200).json("E-mail successfully changed.");

            } else if (body.celnum_usu) {
                let data = {
                    celnum_usu: body.celnum_usu
                };

                updateColumn(idUser, data);
                responseStatus = response.status(200).json("Phone number successfully changed.");
            }

        } catch (error: any) {
            responseStatus = response.status(500).json("An Internal Error has Occurred.");
        };

        return responseStatus;
    }

    async deleteUser(request: Request, response: Response) {

        const body = request.body;
        const idUser = body.id_usu;
        let responseStatus;

        try {

            await prisma.user.delete({
                where: {
                    id_usu: idUser
                }
            })

            responseStatus = response.status(200).json("User successfully deleted.");

        } catch (error: any) {

            if (error['code'] == "P2025") {
                if (error['meta']['cause'] == "Record to delete does not exist.") {
                    responseStatus = response.status(409).json("User not found.");
                }
            } else {
                responseStatus = response.status(500).json("An Internal Error has Occurred.");
            }

        }
        return responseStatus;
    }

    async reqRecovPass(request: Request, response: Response) {
        const body = request.body;
        let responseStatus;

        let isVerifiedMail = (await sendMsgSrv.isVerifiedMail(body.email_usu))

        try {

            //verifica se o e-mail do usuário está verificado
            if (isVerifiedMail['VerificationStatus'] == "Pending") {
                responseStatus = response.status(401).json("E-mail not verified, please verify your e-mail and try again.");
            } else {

                sendMsgSrv.sendRecoveryPassMessageService(body.email_usu)

                responseStatus = response.status(201).json("Check your email for instructions of how to reset your password");
            }

        } catch (error) {
            responseStatus = response.status(500).json("An Internal Error has Occurred.");
        }

        return responseStatus
    }
}