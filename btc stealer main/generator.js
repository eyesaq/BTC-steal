"use strict";

process.title = "Bitcoin Stealer by Eyesaq";

const CoinKey = require('coinkey');
const fs = require('fs');

const data = fs.readFileSync('./riches.txt');

function generate() {
    // generate random private key hex
    let privateKeyHex = r(64);
    
    // create new bitcoin key pairs
    let ck = new CoinKey(Buffer.from(privateKeyHex, 'hex'));
    
    ck.compressed = false;
    console.log("\x1b[31m" + ck.publicAddress + "\x1b[32m" + " [scanned]")
    //see logs add // infront of line if u dont wanna see the logs it speeds it up
        
    // if generated wallet matches any from the riches.txt file, tell us we won!
    if(data.includes(ck.publicAddress)){
        console.log("");
        process.stdout.write('\x07');
        console.log("\x1b[32m%s\x1b[0m", ">> Success: " + ck.publicAddress);
        var successString = "Wallet: " + ck.publicAddress + "\n\nSeed: " + ck.privateWif;
            
        // save the wallet and its private key (seed) to a Success.txt file in the same folder 
        fs.writeFileSync('./Success.txt', successString, (err) => {
            if (err) throw err; 
        })
            
        // close program after success
        process.exit();
    }
}

// the function to generate random hex string
function r(l) {
    let randomChars = 'ABCDF0123456789';
    let result = '';
    for ( var i = 0; i < l; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

// run forever
while(true){
    generate();
}
