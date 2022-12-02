import SES from 'aws-sdk/clients/ses'
import 'dotenv/config';
import { Request, Response } from "express";
import { sendMsgSrv } from '../routes/Routes';
import { prisma } from '../utils/prisma';

export class SendMessageService {
    private client: SES;

    constructor() {
        this.client = new SES({
            region: 'us-east-1',
            credentials: {
                accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
                secretAccessKey: String(process.env.AWS_SECRET_ACESS_KEY)
            }
        });
    };



    public async runSendMessageService(request: Request, response: Response) {

        let responseMsg
        console.log(request.body)

        async function selSourceByDecodedId() {
            const { name_usu, email_usu } = await prisma.user.findUniqueOrThrow({
                select: {
                    name_usu: true,
                    email_usu: true
                },
                where: {
                    id_usu: request.body.id
                }
            })

            return { name_usu, email_usu }
        }

        try {
            let sourceName = (await selSourceByDecodedId()).name_usu
            let sourceEmail = (await selSourceByDecodedId()).email_usu
            sendMsgSrv.client.sendEmail({
                Source: sourceName + " <" + sourceEmail + ">", //'Phelipe Lucas <phlucasfr@gmail.com>',
                Destination: {
                    ToAddresses: ['Phelipe Lucas <phlucasfr@gmail.com>'],

                },
                Message: {
                    Subject: {
                        Data: 'Olá mundo!!!'
                    },
                    Body: {
                        Text: {
                            Data: 'Envio de e-mail teste feito com sucesso!'
                        }
                    }
                },
                ConfigurationSetName: 'loginPage'
            }).promise();

            responseMsg = response.status(201).json("E-mail successfully sended.");

        } catch (error) {
            console.log(error)
            responseMsg = response.status(500).json("An Internal Error has Occurred");
        }

        return responseMsg;
    }
}