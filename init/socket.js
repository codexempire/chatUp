const {Server} = require('socket.io');
module.exports = (server) => {
    const io = new Server(server);

    io.on('connection', socket => {
        console.log(`${socket} has connected to the server...`);
        global.socket = socket;
        global.io = io;

        socket.on('disconnect', () => {
            console.log(`${socket} has disconnected from the server...`);
        })
    })
};