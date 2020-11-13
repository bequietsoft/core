const http = require('http')
const fs = require('fs')
const mime = require('mime')
const root = '/client'

function send(url, res) {
    
    if (url === '/') 
        url += 'index.html'
    else if ( !mime.getType(url) ) {
        console.log('No recognised MIME type: ' + url);
        return;
    }

    fs.readFile(__dirname + root + url, (err, data) => {
        res.setHeader('Content-Type', mime.getType(url))
        res.writeHead(200)
        if (err) { res.writeHead(404); data = 404; }
        res.end(data)
    })
}

var server = http.createServer((req, res) => {
        
    if (req.method === 'GET') send(req.url, res)
        
    if(req.method === 'POST') {
        if (req.body === undefined) req.body = ''
        req.on('data', chunk => {
            req.body += chunk.toString();
        })
    }

    req.on('end', () => {
        if(req.body) {
            console.log(req.body)
            res.end('ok')
        }
    })
})

server.listen('3000', () => console.log('Server started on 3000'))