const Blockchain = require("./blockchain");
const blockchain = new Blockchain();

blockchain.addBlock({data:"new data"});
let prevTimestamp,nextTimestamp,nextBlock,timeDiff,averageTime;

const times =[];

for (let i = 0; i < 1000; i++) {
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({data:`block ${i}`});
    nextBlock=blockchain.chain[blockchain.chain.length-1];
    nextTimestamp = nextBlock.timestamp;

    timeDiff=nextTimestamp-prevTimestamp;
    times.push(timeDiff)

    averageTime = times.reduce((total,num)=>(total+num))/times.length;

    console.log(`Time to mine block: ${timeDiff}ms ,Difficultty:${nextBlock.difficulty},Average time:${averageTime}ms`);
}
/*Therefore, in this code snippet,
the first block added to the blockchain using blockchain.addBlock({data:"new data"}); 
is actually the second block in the chain. The first block is the genesis block, 
which is automatically added when a new Blockchain instance is created. */