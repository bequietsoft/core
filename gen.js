const fs = require('fs');
const ss = require('selfsigned');

function main() {
    
    //var attrs = [{ name: 'shortName', value: 'domainName' }];
    
    var config = { 
        keySize: 2048, 
        days: 365, 
        algorithm: 'sha256' 
    };
    
    //var pems = ss.generate(attrs, config);
    var pems = ss.generate(null, config);

    //console.log(pems);

    if (pems.private !== undefined) 
        fs.writeFileSync(__dirname + '/cert/private', pems.private, );
    if (pems.public !== undefined) 
        fs.writeFileSync(__dirname + '/cert/public', pems.public);
    if (pems.cert !== undefined) 
        fs.writeFileSync(__dirname + '/cert/cert', pems.cert);
    if (pems.fingerprint !== undefined) 
        fs.writeFileSync(__dirname + '/cert/fingerprint', pems.fingerprint);

    
}

main();
