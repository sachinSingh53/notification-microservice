const { emailTemplates } = require("../helper");


async function sendEmail(template,receiverEmail,locals){
    try{
        await emailTemplates(template,receiverEmail,locals);
    }catch(err){
        console.log(err);
    }
}

module.exports = {sendEmail};