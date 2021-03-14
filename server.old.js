const express = require('express');
const http = require('http');
const ws = require("ws");

//const ipfilter = require('express-ipfilter').IpFilter;
//const https = require('https');
//const UUID = require("uuid");

//const fs = require('fs');
//const Datastore = require('nedb');
//const ips = ['127.0.0.2']

const port = 3600;
const app = express();     
const http_server = http.createServer(app);     
const websocket_server = new ws.Server({ server: http_server });

app.use(express.static('public'));

websocket_server.on('connection', websocket => {
    
    websocket.on('message', msg => {
        websocket_server.clients.forEach( client => client.send(msg) );
    });

    websocket.on("error", err => ws.send(err) );

    console.log(ws);
    websocket.send('Hi there, I am a WebSocket server');

});

http_server.listen(port);//, () => console.log("Server started"));


// app.use(ipfilter(ips, { mode: 'allow' }));

//let db = new Datastore({filename: 'db/users'});
//db.loadDatabase();

// var options = {
// 	key: fs.readFileSync('/ssl/private.key'),
// 	cert: fs.readFileSync('/ssl/cert.key')
// };

//let ssl = await devcert.certificateFor('core.test');

//https.createServer(options, app).listen(3002);
//http.createServer(app).listen(port);
//http.createServer(app).listen(80, '192.168.1.69');

// // web socket server:
// const websocketserver = new WebSocket.Server({ port: port+1 });
// function broadcast(clientId, message) {
//     websocketserver.clients.forEach(client => {
//     if(client.readyState === WebSocket.OPEN) {
//         client.send(`[${clientId}]: ${message}`);
//     }
//   });
// }

// websocketserver.on('conection', socket => {
//     socket.id = UUID();
//     socket.on('message', message => broadcast(socket.id, message));
// });