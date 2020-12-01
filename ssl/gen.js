const fs = require('fs');
const selfsigned = require('selfsigned');

function main() {
    
    var attrs = [{ name: 'test', value: 'test.com' }];

    var config = { 
        keySize: 2048, 
        days: 365, 
        algorithm: 'sha256',
        clientCertificate: true,
        clientCertificateCN: 'tester'
    };
    
    var pems = selfsigned.generate(attrs, { days: 365} );
    //var pems = selfsigned.generate(null, config);
    console.log(pems);

    // if (pems.private !== undefined) 
    //     fs.writeFileSync(__dirname + '\\private.key', pems.private, );
   
    // if (pems.public !== undefined) 
    //     fs.writeFileSync(__dirname + '\\public.key', pems.public);

    
    // if (pems.cert !== undefined) 
    //     fs.writeFileSync(__dirname + '\\cert.key', pems.cert);

    // if (pems.fingerprint !== undefined) 
    //     fs.writeFileSync(__dirname + '\\fingerprint.key', pems.fingerprint);
    

    
}

main();
