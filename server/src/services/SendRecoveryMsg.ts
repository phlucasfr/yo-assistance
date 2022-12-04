// import SES from 'aws-sdk/clients/ses'
// import 'dotenv/config';
// import { sendMsgSrv } from '../routes/Routes';
// import { prisma } from '../utils/prisma';

// export class SendMessageService {
//     private client: SES;

//     constructor() {
//         this.client = new SES({
//             region: 'us-east-1',
//             credentials: {
//                 accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
//                 secretAccessKey: String(process.env.AWS_SECRET_ACESS_KEY)
//             }
//         });
//     };

//     public async sendVerifMessageService(
//         nameUser: string,
//         emailUser: string,
//     ) {

//         const selUser = await prisma.user.findUnique({
//             select: {
//                 vercod_usu: true
//             }, where: {
//                 email_usu: emailUser
//             }
//         })

//         let htmlBase = "<html>"
//             + "<head>"
//             + "<meta charset='UTF-8'>"
//             + "</head>"
//             + "<body>"
//             + "<h1>Ol&aacute; " + nameUser + " !</h1>"
//             + "<p>Seu c&oacute;digo de verifica&ccedil;&atilde;o &eacute; "
//             + selUser?.vercod_usu + "</p>"
//             + "</body>"
//             + "</html>";

//         await sendMsgSrv.client.verifyEmailIdentity({
//             EmailAddress: emailUser,
//         }).promise();

//         let isVerified = await sendMsgSrv.client.getIdentityVerificationAttributes({
//             Identities: [emailUser],
//         }).promise()


//         try {


//             await sendMsgSrv.client.sendEmail({
//                 Source: 'Phelipe Lucas <phlucasfr@gmail.com>',
//                 Destination: {
//                     ToAddresses: [nameUser + ' <' + emailUser + '>'],
//                 },
//                 Message: {

//                     Subject: {
//                         Data: 'Verificação de usuário'
//                     },

//                     Body: {
//                         Html: {
//                             Charset: 'UTF-8',
//                             Data: htmlBase,
//                         }
//                     }
//                 },
//                 ConfigurationSetName: 'loginPage'
//             }).promise();

//         } catch (error) {
//             console.log(error)
//         }
//     }
// }
