const bodyParser = require('body-parser');
const express = require('express');
const request = require("request");
const Blockchain = require('./blockchain')
const PubSub = require("./publishsubscribe");

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub(({ blockchain }))

const DEGFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `HTTP://LOCALHOST:${DEGFAULT_PORT}`;
setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());
app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain)
})

app.post("/api/mine", (req, res) => {
    const { data } = req.body;

    blockchain.addBlock({ data });
    pubsub.broadcastChain();
    res.redirect('/api/blocks')
})

const synChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const rootChain = JSON.parse(body);
            console.log('Replace chain on sync with', rootChain)
            blockchain.replaceChain(rootChain)
        }
    })
}


let PEER_PORT;

if (process.env.GENERATE_PEEER_PORT === 'true') {
    PEER_PORT = DEGFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEGFAULT_PORT;
app.listen(PORT, () => {
    console.log(`listening to PORT:${PORT}`);
    synChains();
})