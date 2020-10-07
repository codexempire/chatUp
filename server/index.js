const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users, chats;

const saveChat = (chat) => {
    fs.writeFile('db/chats.json', JSON.stringify(chat), err => {
        if (err) console.log(err.message);
        console.log('Saved');
    })
}
fs.readFile('db/users.json', (err, data) => {
    if (err) console.log(err.message);
    const db = JSON.parse(data);
    users = db;
});

fs.readFile('db/chats.json', (err, data) => {
    if (err) console.log(err.message);
    const db = JSON.parse(data);
    chats = db;
});

// Run when a client connects
io.on('connection', socket => {
    socket.on('get-meg', () => {
        socket.emit('get-meg', chats.chats);
    })
    socket.on('message', (msg) => {
        chats.chats.push(msg);
        saveChat(chats);
        io.emit('message', msg);
    });

    socket.on('add-user', userObj => {
        const userFound = users.users.find(user => user.name === userObj.name);
        if (!userFound) {
            users.users.push(userObj);
            const db = JSON.stringify(users);
            fs.writeFile('db/users.json', db, err => {
                if (err) console.log(err.message);
                console.log('Saved');
            })
            chats.chats.push({ name: 'bot', chat: `${userObj.name} has joined chatUP` })
            saveChat(chats);
            io.emit('message', { name: 'bot', chat: `${userObj.name} has joined chatUP` });
        }
    })
})

const port = process.env.PORT || 3000;

server.listen(port, console.log(`Running on port: ${port}`))