require('express-async-errors');

const healthRoutes = require('./routes');
const{createConnection}  = require('./queues/connection');
const { consumeAuthEmailMessages,consumeOrderEmailMessages } = require('./queues/email.consumer');
const {winstonLogger} = require('../../9-jobber-shared/src/logger');

const log = winstonLogger('Notification Server','debug');


function start(app){
    startServer(app);
    app.use('',healthRoutes);
    startQueues();
    // startElasticSearch();
}

async function startQueues(){
    const emailChannel = await createConnection();
    // await consumeAuthEmailMessages(emailChannel);
    // await consumeOrderEmailMessages(emailChannel);

}

// function startElasticSearch(){

// }

const SERVER_PORT = 4001;
function startServer(app){
    try {
        app.listen(SERVER_PORT,()=>{
            log.info(`listing on port ${SERVER_PORT}`);
        });
        
    } catch (err) {
        log.log('error','Notification Service startServer()',err);
        
    }
}


module.exports = {
    start,
    startQueues,
    // startElasticSearch,
    startServer
}