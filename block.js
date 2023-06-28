const hexToBinary = require("hex-to-binary");
const {GENESIS_DATA, MINE_RATE} = require("./config");
const cryptoHash = require("./crypto-hash");
class Block{
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}){ //passing parameters as objects 
       this.timestamp = timestamp;
       this.prevHash= prevHash;
       this.hash=hash;
       this.data=data; 
       this.nonce=nonce; 
       this.difficulty=difficulty; 
    }
    static genesis() {
        return new this(GENESIS_DATA);
    } 
    static mineBlock({prevBlock,data}){
        let hash,timestamp;
        const prevHash = prevBlock.hash;
        let {difficulty} = prevBlock;

        let nonce =0;
        do {
            nonce++;
            timestamp=Date.now();
            difficulty = Block.adjustDifficulty({
                orginalBlock:prevBlock,
                timestamp,
            });
            hash= cryptoHash(timestamp,prevHash,data,nonce,difficulty)
        } while (hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
        return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash,
        });
    }

    static adjustDifficulty({orginalBlock,timestamp}){
        const {difficulty}=orginalBlock;
        if(difficulty<1) return 1;
        const difference = timestamp - orginalBlock.timestamp;
        if (difference>MINE_RATE) {
            return difficulty -1;
        }
        else
        {
            return difficulty +1;
        }
    }
}

const block1 = new Block
({
    hash : "0xacb",
    timestamp : "24/06/23",
    prevHash :"0xc12",
    data:"hillo",
});

//console.log(block1);

//const result= Block.mineBlock({prevBlock:block1,data:"block 2"})
//console.log(result);
module.exports = Block;