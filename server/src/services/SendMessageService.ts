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
        console.log(strIsVerified)
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
}
