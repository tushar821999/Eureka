const io = socketio(server)

io.on('connection', socket => {
    console.log("New user connected")
})