import 'express-async-errors';
import { createConnection } from './queues/connection.js';
import { consumeAuthEmailMessages, consumeOrderEmailMessages } from './queues/emailConsumer.js';
import { winstonLogger } from '../../9-jobber-shared/src/logger.js';
import healthRoutes from './routes.js';


const log = winstonLogger('Notification Server', 'debug');

async function start(app) {
    startServer(app);
    app.use('', healthRoutes);
    await startQueues();
    
}

async function startQueues() {
    const emailChannel = await createConnection();
    // Uncomment the following lines if you want to start consuming email messages
    await consumeAuthEmailMessages(emailChannel);
    await consumeOrderEmailMessages(emailChannel);
   
}

const SERVER_PORT = 4001;

function startServer(app) {
    try {
        app.listen(SERVER_PORT, () => {
            log.info(`Listening on port ${SERVER_PORT}`);
        });
    } catch (error) {
        log.log('error', 'NotificationService startServer() method:', error);
    }
}

export { start };
