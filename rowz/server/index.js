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

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 5 },
    }),
    )
    
    // app.use( express.static( __dirname + '/../build'));
    // app.get('*', (req,res) => {
    //     res.send(path.join(__dirname, '../build/index.html'))
    // })
    
    
    // websocket
    const webSocketsServerPort = 8001;
    
    const server = http.createServer();
    server.listen(webSocketsServerPort, () => console.log(`sockets connected on ${webSocketsServerPort}`));
    const wsServer = new webSocketServer({
        httpServer: server
    });
    
    const clients = {};
    const testString = 'does this reach the front?'
    
    // // This code generates unique userid for everyuser.
    const getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4();
    };
    
    wsServer.on('request', function(request) {
        // console.log('here are your clients',clients['fb5450f3-12da'])
        var userID = getUniqueID();
        const connection = request.accept(null, request.origin);
        clients[userID] = connection;
        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                console.log('Recieved Message: ',message.utf8Data);
            }
            
            for(key in clients) {
                // console.log('in backend funtion',clients[key])
                // clients[key].sendUTF(message.utf8Data);
                clients[key].sendUTF(message.utf8Data);
            }
        })
        
    });

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