/**
 * The list of all supported socket events
 * @see SocketController
 */
const SocketEvents = {
  server: {
    connect: 'connect',
    disconnect: 'disconnect',
  },
  socket: {
    emit: {
      chatEnter: 'successEnter',
      roomUsers: 'liveRoomUsers',
      newMessage: 'broadcastChatMessage',
    },
    on: {
      enterRoom: 'sendName',
      sendMessage: 'sendChatMessage',
    },
  },
};

module.exports = SocketEvents;
