const crypto = require('crypto') //importing module


const cryptoHash=(...inputs)=>{  
    const hash = crypto.createHash("sha256");
    hash.update(inputs.sort().join(" "));
    return (hash.digest("hex"));
};

result = cryptoHash("hello","maddy");
module.exports = cryptoHash;