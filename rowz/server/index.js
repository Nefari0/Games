const express = require('express')
const path = require('path')
const session = require('session')
const massive = require('massive')

// endpoints



// server
app.use( express.static( __dirname + '/../build'));
app.get('*', (req,res) => {
res.send(path.join(__dirname, '../build/index.html'))
})


// websocket
const webSocketsServerPort = 8001;

const server = http.createServer();
server.listen(webSocketsServerPort, () => console.log(`sockets connected on ${webSocketsServerPort}`));
const wsServer = new webSocketServer({
  httpServer: server
});

const clients = {};

// // This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
    var userID = getUniqueID();
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // console.log('Recieved Message: ',message.utf8Data);
        }

        for(key in clients) {
            clients[key].sendUTF(message.utf8Data);
        }
    })

    });

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