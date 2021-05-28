const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

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

app.get('/prochat', (req, res) => {
    res.render('prochat')
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
})