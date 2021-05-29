const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//login code
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app");
//end of login code

//needed don't touch
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('views'))
//needed don't touch

//withlogin
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//end of login code here

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

//=====================
// ROUTES
//=====================



// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

// Showing register form
app.get("/signup", function (req, res) {
    res.render("signup");
});

// Handling user signup
app.post("/signup", function (req, res) {
    var username = req.body.username
    var password = req.body.password
    User.signup(new User({ username: username }),
        password, function (err, user) {
            if (err) {
                console.log(err);
                return res.render("signup");
            }

            passport.authenticate("local")(
                req, res, function () {
                    res.render("accountPage");
                });
        });
});

//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});

//Handling user login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/accountPage",
    failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout 
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}








