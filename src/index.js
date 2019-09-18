/*
const express = require("express");
const mongoose = require("mongoose");
const config  = require('./config/config');
const path = require("path");
const cors = require("cors");
const app = express();


const server = require('http').Server(app);
const io = require("socket.io")(server);


mongoose.connect(config.urlConnect,{
    useNewUrlParser:config.newParser
})

app.use((req,res,next)=>{
    req.io = io;
    next();
})
io.on('connection',socket=>{
    console.log('socket ativado!')
})
app.use(cors());
app.use(require("./routes"));
app.use('/files',express.static(path.resolve(__dirname,'..','uploads','resized')))

app.listen(config.port,()=>{
    console.log("server on!");
}) 

*/

//require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//express que permite lidar com rotas, parametros e respostas dos clientes
const app = express();

//divide o servidor para trabalhar com http e websocket (que permite tempo real em aplicações)
const server = require('http').Server(app);
const io = require('socket.io')(server);

//conecta ao banco de dados MongoDB
mongoose.connect(`mongodb+srv://omni:omni@clusterapi-mrbe0.mongodb.net/test?retryWrites=true&w=majority`,{
useNewUrlParser: true,
});

//repassa informação para todas as rotas do websocket
app.use((req, res, next) =>{
    req.io = io;

    next();
});

//permite que todos os endereços/urls/ips possam acessar esse backend
app.use(cors());

//rota para acesso de arquivos estaticos 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//rota para declarar as rotas da aplicação
app.use(require('./routes'));

server.listen(3333,()=>{
    console.log('on!');
});