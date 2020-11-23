const express = require('express');
const http = require('http');
const https = require('https');

const fs = require('fs');
const Datastore = require('nedb');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

let db = new Datastore({filename: 'db/users'});
db.loadDatabase();

// routes
app.get('/', (req, res) => res.render('index'));
app.use(authRoutes);

let https_mode = false;
process.argv.slice(2).forEach(a => {
	//console.log(a);
	if (a === '-https') https_mode = true;
});

if (https_mode) {
	var httpsOptions = {
		key: fs.readFileSync(__dirname + '/cert/private'),
		cert: fs.readFileSync(__dirname + '/cert/cert')
	};
	https.createServer(httpsOptions, app).listen(443);
} else 
	http.createServer(app).listen(3000);