const express = require('express');
const app = express();
const socketio = require('socket.io');
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/reminders', (req, res) => {
    res.render('reminders')
});

app.get('/quickchat', (req, res) => {
    res.render('quickchat')
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is running")
})

const io = socketio(server)

io.on('connection', socket => {
    console.log("New user connected")

    socket.username = "Anonymous"

    socket.on('change_username', data => {
        socket.username = data.username
    })
})




