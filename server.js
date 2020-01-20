const express = require('express');
const cors = require('cors');
const helmet = require('helmet');



const db = require('./data/dbConfig');

const accountsRouter = require('./routers/accountsRouter');

const server = express();
server.use(cors());
server.use(helmet('dev'));
server.use(express.json());


server.use('/api/accounts', accountsRouter);

server.get('/', (req,res) =>{
    res.send(`<h1>${process.env.SERVERMSG}</h1>`);
});

module.exports = server;