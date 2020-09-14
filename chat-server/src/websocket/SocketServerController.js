const io = require('socket.io');
const SocketEvents = require('./SocketEvents');
const SocketController = require('./SocketController');
const idGenerator = require('../utils/idGenerator');

/**
 * Socket server controller
 * @property {WeakMap<Socket, User>} users List of all connected users
 * @property {Generator<string, void, *>} idGen Unique ID generator
 * @property {string} serverName Name of socket server
 * @property {io.Server} socketServer Socket server instance
 */
class SocketServerController {
  /**
   * Creates socket server instance, setups it and attaches it to httpServer
   * @param {HttpServerController} httpServerController Http server controller instance
   * @return {SocketServerController} Socket server controller instance
   */
  static attach(httpServerController) {
    console.log(`Socket server attached to port: ${httpServerController.port}`);
    return new SocketServerController(httpServerController.httpServer);
  }

  // eslint-disable-next-line require-jsdoc
  constructor(httpServer) {
    if (!!SocketServerController.instance) {
      return SocketServerController.instance;
    } else {
      this.users = new WeakMap();
      this.idGen = idGenerator();
      this.serverName = 'Server';
      this.socketServer = io(httpServer);
      this.socketServer.on(
        SocketEvents.SERVER.CONNECT,
        this._onConnect.bind(this)
      );
      SocketServerController.instance = this;
    }
  }

  /**
   * Calls when new socket connected
   * @param {io.Socket} socket Socket partial
   * @private
   */
  _onConnect(socket) {
    console.log(`Connected ${socket.id} total: ${this.getConnectionsCount()}`);
    SocketController.start(socket, this);
  }

  /**
   * @param {string} room Socket room identifier
   * @return {User[]} List of all users in the room
   */
  getRoomUsers(room) {
    const roomSockets = this._getRoomSockets(room);
    // @TODO change return string[] to return User[]
    return roomSockets.map((socket) => this.users.get(socket).name);
  }

  /**
   * @param {string} room Socket server room identifier
   * @return {Socket[]} List of all sockets in the room
   * @private
   */
  _getRoomSockets(room) {
    if (!this.isRoomExists(room)) return [];

    return Object.keys(
      this.socketServer.sockets.adapter.rooms[room].sockets
    ).map((id) => this.socketServer.sockets.connected[id]);
  }

  /**
   * @param {string} room Socket room identifier
   * @return {boolean} True if the room exists
   */
  isRoomExists(room) {
    const rooms = Object.keys(this.socketServer.sockets.adapter.rooms);
    return rooms.includes(room);
  }

  /**
   * @return {number} Count of all socket server connections
   */
  getConnectionsCount() {
    return Object.keys(this.socketServer.sockets.sockets).length;
  }

  /**
   * @param {string} id Socket connection ID
   * @return {Socket} Socket connection
   */
  getSocketById(id) {
    return this.socketServer.sockets.sockets[id];
  }
}

module.exports = SocketServerController;
