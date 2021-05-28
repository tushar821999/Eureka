const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('views'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/quickchat', (req, res) => {
    res.render('quickchat')
})

app.get('/reminders', (req, res) => {
    res.render('reminders')
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', socket => {
    console.log("New user connected")

    socket.username = "Anonymous"

    socket.on('change_username', data => {
        socket.username = data.username
    })

    //handle the new message event
    socket.on('new_message', data => {
        console.log("new message")
        io.sockets.emit('receive_message', { message: data.message, username: socket.username })
    })

})




