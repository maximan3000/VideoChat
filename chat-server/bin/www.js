const http = require('http');
const io = require('socket.io');
const app = require('../app');
const idGenerator = require('../utils/idGenerator');

const port = normalizePort('3001');
app.set('port', port);

const htttpServer = http.createServer(app);
const socketServer = io(htttpServer);
const users = new WeakMap();
const idGen = idGenerator();
let a;

socketServer.on('connection', (socket) => {
  console.log(
    `Connected ${socket.id} connections`,
    Object.keys(socketServer.sockets.sockets).length
  );

  socket.on('sendName', (arg) => {
    users.set(socket, arg.name);
    let rooms = Object.keys(socketServer.sockets.adapter.rooms);

    let room;
    if (rooms.includes(arg.room)) {
      room = arg.room;
    } else {
      room = idGen.next().value;
    }

    socket.join(room, () => {
      const rooms = Object.keys(socket.rooms);
      console.log(`User ${users.get(socket)} joined to room #(${room})
      \nHe is a member of this rooms: [${rooms}]`);

      socket.to(room).emit('broadcastChatMessage', {
        timestamp: Date.now(),
        sender: 'System',
        text: `User [${arg.name}] connected!`,
        isOwn: false,
      });
      const roomUsers = getLiveRoomUsers(room);
      socket.to(room).emit('liveRoomUsers', roomUsers);
      socket.emit('liveRoomUsers', roomUsers);
    });

    socket.on('sendChatMessage', (message) => {
      const newMessage = {
        sender: users.get(socket) || '',
        text: message.text,
        timestamp: Date.now(),
        id: socket.id,
      };
      console.log('Got message: ', newMessage, Object.keys(socket.rooms));
      for (room of Object.keys(socket.rooms)) {
        socket.to(room).emit('broadcastChatMessage', newMessage);
      }
      socket.emit('broadcastChatMessage', newMessage);
    });

    socket.emit('successEnter', room);

    console.log('Got name: ', arg.name);
  });

  socket.on('disconnecting', (reason) => {
    let roomUsers;
    const rooms = socket.rooms;
    const name = users.get(socket);

    socket.on('disconnect', () => {
      Object.keys(rooms)
        .filter((roomId) => socketServer.sockets.adapter.rooms[roomId])
        .forEach((roomId) => {
          roomUsers = getLiveRoomUsers(roomId);
          console.log(roomUsers);

          socket.to(roomId).emit('liveRoomUsers', roomUsers);
          socket.to(roomId).emit('serverMessage', {
            name: name,
            timestamp: Date.now(),
            text: `User [${name}] disconnected!`,
          });
        });
    });

    console.log(
      `Username ${users.get(socket)} disconnected. Reason: ${reason}`
    );
  });
});

function getLiveRoomUsers(room) {
  const roomSockets = Object.keys(
    socketServer.sockets.adapter.rooms[room].sockets
  ).map((id) => socketServer.sockets.connected[id]);
  const roomUsers = roomSockets.map((socket) => users.get(socket));
  console.log('Room users', roomUsers);
  return roomUsers;
}

/**
 * Listen on provided port, on all network interfaces.
 */

htttpServer.listen(port);
htttpServer.on('error', onError);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP htttpServer "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
