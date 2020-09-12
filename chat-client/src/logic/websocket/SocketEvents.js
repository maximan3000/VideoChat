/**
 * The list of all supported socket events
 * @see SocketController
 */
export const SocketEvents = {
  on: {
    connect: 'connect',
    disconnect: 'disconnect',
    chatEnter: 'successEnter',
    roomUsers: 'liveRoomUsers',
    newMessage: 'broadcastChatMessage',
  },
  emit: {
    enterRoom: 'sendName',
    sendMessage: 'sendChatMessage',
  },
};
