const express = require('express');
const{start} = require('./server');

function init(){
    const app = express();
    start(app);
}

init();