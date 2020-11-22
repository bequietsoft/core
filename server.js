const express = require('express');
const http = require('http');
const https = require('https');

const fs = require('fs');
const Datastore = require('nedb');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.static('public'));
//app.set('view engine', 'ejs');

let db = new Datastore({filename: 'db/users'});
db.loadDatabase();

// routes
//app.get('/', (req, res) => res.render('home'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.use(authRoutes);


var httpsOptions = {
    key: fs.readFileSync(__dirname + '/cert/private'),
    cert: fs.readFileSync(__dirname + '/cert/cert')
};

//console.log(httpsOptions);

//http.createServer(app).listen(80);
https.createServer(httpsOptions, app).listen(443);