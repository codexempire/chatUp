const express = require('express');
const http = require('http');
// const https = require('https');
const config = require('dotenv').config;

config();

const app = express();

const httpPort = process.env.PORT || 4000;
const httpsPort = process.env.PORT || 4440;

const server = http.createServer(app);

module.exports = server;

// Server is working
require('./init')(server, app);

server.listen(httpPort, err => {
    if (err)
        console.log(`Error starting http server on port ${httpPort}`);
    
    console.log(`HTTP server running on PORT ${httpPort}`);
});



// https.createServer(app).listen(httpsPort, err => {
//     if (err)
//         console.log(`Error starting https server on port ${httpsPort}`);
    
//     console.log(`HTTPS server running on PORT ${httpsPort}`);
// });