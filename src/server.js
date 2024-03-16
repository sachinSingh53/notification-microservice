const healthRoutes = require('./routes');
const { Config } = require('./config'); 
const config = new Config();
const{createConnection}  = require('./queues/connection');
const { consumeAuthEmailMessages,consumeOrderEmailMessages } = require('./queues/email.consumer');



function start(app){
    startServer(app);
    app.use('',healthRoutes);
    startQueues();
    // startElasticSearch();
}

async function startQueues(){
    const emailChannel = await createConnection();
    await consumeAuthEmailMessages(emailChannel);
    await consumeOrderEmailMessages(emailChannel);

    // const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=1234wqewewle`;
    // const messageDetails = {
    //     receiverEmail: `${config.SENDER_EMAIL}`,
    //     verifyLink:verificationLink,
    //     template: 'verifyEmail'
    // }

    
    // await emailChannel.assertExchange('jobber-order-notification','direct');
    // const message1 = JSON.stringify(messageDetails);
    // emailChannel.publish('jobber-order-notification','order-email',Buffer.from(message1));

    // await emailChannel.assertExchange('jobber-email-notification','direct');
    // const message2 = JSON.stringify(messageDetails);
    // emailChannel.publish('jobber-email-notification','auth-email',Buffer.from(message2));

}

// function startElasticSearch(){

// }

const SERVER_PORT = 4001;
function startServer(app){
    try {
        app.listen(SERVER_PORT,()=>{
            console.log(`listing on port ${SERVER_PORT}`);
        });
        
    } catch (err) {
        console.log(err);
        
    }
}


module.exports = {
    start,
    startQueues,
    // startElasticSearch,
    startServer
}