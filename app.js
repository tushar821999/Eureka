const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



//needed don't touch
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('views'))
//needed don't touch



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/quickchat', (req, res) => {
    res.render('quickchat')
})

app.get('/reminders', (req, res) => {
    res.render('reminders')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/landing', (req, res) => {
    res.render('landing')
})
app.get('/prochat', (req, res) => {
    res.render('prochat')
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});

/////////////////////
//for the quick chat
/////////////////////
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
