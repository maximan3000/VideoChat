const socketControllerChat = require('./partial/socketControllerChat');
const socketControllerWebRtc = require('./partial/socketControllerWebRtc');

/**
 * A client websocket partial controller
 * @property {SocketServerController} socketServer
 * @property {Socket} socket
 * @property {string} room Socket server room, attached to the socket connection
 */
class SocketController {
  /**
   * Setups socket connection behavior
   * @param {Socket} socket Socket connection
   * @param {SocketServerController} socketServerController Controller of the socket server
   */
  static start(socket, socketServerController) {
    new SocketController(socket, socketServerController);
  }

  // eslint-disable-next-line require-jsdoc
  constructor(socket, socketServerController) {
    this.socketServer = socketServerController;
    this.socket = socket;
    this.room = this.socket.id;

    socketControllerChat.bind(this)();
    socketControllerWebRtc.bind(this)();
  }
}

module.exports = SocketController;
