const nodemailer = require('nodemailer');
const { Config } = require('./config');
const config = new Config();
const Email = require('email-templates');
const path = require('path');

async function emailTemplates(template, receiverEmail, locals) {
    try {
        const smtpTransport = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: config.SENDER_EMAIL,
                pass: config.SENDER_EMAIL_PASSWORD
            }
        });
        const email = new Email({
            message: {
                from: `Jobber App <${config.SENDER_EMAIL}>`
            },
            send: true,
            preview: false,
            transport: smtpTransport,
            views: {
                options: {
                    extension: 'ejs'
                }
            },
            juice: true,
            juiceResources: {
                preserveImportant: true,
                webResources: {
                    relativeTo: path.join(__dirname, '..', 'src/emails')
                }
            }

        });

        await email.send({
            template: path.join(__dirname, '..', 'src/emails', template),
            message: { to: receiverEmail },
            locals
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    emailTemplates
}