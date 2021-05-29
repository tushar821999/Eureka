//login code
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
    process.env.DATABASEURL,
    { useNewUrlParser: true }
);
//end of login code

//withlogin
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());

//end of login code here

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