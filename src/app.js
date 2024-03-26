import express from 'express';
import {start} from './server.js'

async function init() {
    const app = express();
    await start(app);
}

init();
