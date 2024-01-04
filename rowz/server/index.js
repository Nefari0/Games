const express = require('express')
const path = require('path')
const session = require('express-session')
const massive = require('massive')
require('dotenv').config({ path: __dirname + '/../.env'})
const http = require('http')
const boardController = require('./controllers/boardController')
const webSocketServer = require('websocket').server;

// server
const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env

const app = express();

app.use(express.json());

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 5 },
    }),
    )
    
    app.use( express.static( __dirname + '/../build'));
    app.get('*', (req,res) => {
        res.send(path.join(__dirname, '../build/index.html'))
    })
    
    // websocket //
    const webSocketsServerPort = 8003;
    
    const server = http.createServer();
    server.listen(webSocketsServerPort, () => console.log(`sockets connected on ${webSocketsServerPort}`));
    const wsServer = new webSocketServer({
        httpServer: server
    });
    
    const clients = {};

    const getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4();
    };
    
    wsServer.on('request', function(request) {
        const userID = getUniqueID();
        const connection = request.accept(null, request.origin);

        clients[userID] = connection;

        connection.on('message', function(message) {
            const { utf8Data } = message
            const data = JSON.parse(utf8Data)
            const { type } = data

            if (type === 'checkerTurn') {sendToClients(utf8Data)} // Send game info

            if (type === 'ping') {pingpong(utf8Data)} // Staying connected to websocket
        })
        
    });

    const sendToClients = (message) => {
        for(key in clients) {
            clients[key].sendUTF(message);
        }
    }

    const pingpong = (data) => { // Staying connected to websockets

        setTimeout(function () {
            idCounter = []
            sendToClients(data)
        }, 1000*50 );
        
    }

    // endpoints
    app.get('/api/board/get',boardController.getBoard)
    
    // massive
    massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    }
}).then((dbInstance) => {
    app.set('db',dbInstance);
    console.log('db connected');
    app.listen(SERVER_PORT, () => console.log(`server ready on ${SERVER_PORT}`))
});