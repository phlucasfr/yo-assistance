import SES from 'aws-sdk/clients/ses'
import 'dotenv/config';
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

    public async isVerifiedMail(emailUser: string) {
        let isVerified = await sendMsgSrv.client.getIdentityVerificationAttributes({
            Identities: [emailUser],
        }).promise()


        let strIsVerified = isVerified.VerificationAttributes[emailUser]

        return strIsVerified
    }

    public async sendVerifMessageService(
        emailUser: string,
    ) {

        try {

            await sendMsgSrv.client.verifyEmailIdentity({
                EmailAddress: emailUser,
            }).promise();

        } catch (error) {
            console.log(error)
        }
    }

    public async sendRecoveryPassMessageService(
        emailUser: string
    ) {

        //troca o código de verificação antes de realizar o envio
        await prisma.user.update({
            where: {
                email_usu: emailUser
            },
            data: {
                vercod_usu: Math.floor(Math.random() * 999999) - 100000
            }
        })

        const selUser = await prisma.user.findUnique({
            select: {
                vercod_usu: true,
                name_usu: true
            }, where: {
                email_usu: emailUser
            }
        })

        let htmlBase = "<html>"
            + "<head>"
            + "<meta charset='UTF-8'>"
            + "</head>"
            + "<body>"
            + "<h1>Ol&aacute; " + selUser?.name_usu + " !</h1>"
            + "<p>Seu c&oacute;digo de verifica&ccedil;&atilde;o &eacute; "
            + selUser?.vercod_usu + "</p>"
            + "</body>"
            + "</html>";

        try {

            await sendMsgSrv.client.sendEmail({
                Source: 'Phelipe Lucas <phlucasfr@gmail.com>',
                Destination: {
                    ToAddresses: [selUser?.name_usu + ' <' + emailUser + '>'],
                },
                Message: {

                    Subject: {
                        Data: 'RecuperaÃ§Ã£o de senha'
                    },

                    Body: {
                        Html: {
                            Charset: 'UTF-8',
                            Data: htmlBase,
                        }
                    }
                },
                ConfigurationSetName: 'loginPage'
            }).promise();

        } catch (error) {
            console.log(error)
        }
    }
}
