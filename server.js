const express = require('express');
//const ipfilter = require('express-ipfilter').IpFilter;
const http = require('http');
//const https = require('https');


const fs = require('fs');
const Datastore = require('nedb');
const ips = ['127.0.0.2']

const app = express();

app.use(express.static('public'));
// app.use(ipfilter(ips, { mode: 'allow' }));

let db = new Datastore({filename: 'db/users'});
db.loadDatabase();

// var options = {
// 	key: fs.readFileSync('/ssl/private.key'),
// 	cert: fs.readFileSync('/ssl/cert.key')
// };

//let ssl = await devcert.certificateFor('core.test');

//https.createServer(options, app).listen(3002);
http.createServer(app).listen(3600);
//http.createServer(app).listen(80, '192.168.1.69');