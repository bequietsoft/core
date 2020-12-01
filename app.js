const express = require('express');
const http = require('http');
const https = require('https');

const fs = require('fs');
const Datastore = require('nedb');

const app = express();

app.use(express.static('public'));

let db = new Datastore({filename: 'db/users'});
db.loadDatabase();


var options = {
	key: fs.readFileSync('/ssl/private.key'),
	cert: fs.readFileSync('/ssl/cert.key')
};

//let ssl = await devcert.certificateFor('core.test');

https.createServer(options, app).listen(3002);
http.createServer(app).listen(3000);