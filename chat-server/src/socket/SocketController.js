const SocketEvents = require('./SocketEvents');
const User = require('./struct/User');
const RoomConnection = require('./struct/incoming/RoomConnection');
const OutgoingMessage = require('./struct/outgoing/OutgoingMessage');
const IncomingMessage = require('./struct/incoming/IncomingMessage');

/**
 * A client socket connection controller
 * @property {SocketServerController} socketServer
 * @property {Socket} socket
 * @property {string} room Socket server room, attached to the socket connection
 */
class SocketController {
  /**
   * Setups socket behavior
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
    this.socket.on(
      SocketEvents.socket.on.enterRoom,
      this._onEnterRoom.bind(this)
    );
    this.socket.on(
      SocketEvents.socket.on.sendMessage,
      this._onMessage.bind(this)
    );
    this.socket.on(
      SocketEvents.server.disconnect,
      this._onDisconnect.bind(this)
    );
  }

  /**
   * Calls when user trying to enter the room
   * @param {RoomConnection} roomConnection
   * @private
   */
  _onEnterRoom(roomConnection) {
    const roomCon = new RoomConnection(
      roomConnection.name,
      roomConnection.room
    );
    this._setUser(roomCon.name);
    this._setRoom(roomCon.room);
    this.socket.join(this.room, this._onJoinRoom.bind(this));
  }

  /**
   * Calls when socket gets a user message
   * @param {IncomingMessage} message User message
   * @private
   */
  _onMessage(message) {
    const incoming = new IncomingMessage(message.text);
    const outgoing = new OutgoingMessage(
      this.socket.id,
      this.socketServer.users.get(this.socket).name,
      Date.now(),
      incoming.text
    );
    this.multicastMessage(outgoing);
    console.log('Got message: ', outgoing);
  }

  /**
   * Calls when socket disconnect
   * @private
   */
  _onDisconnect() {
    const user = this.socketServer.users.get(this.socket);
    if (!!user) {
      this.multicastRoomUsers();
      const message = new OutgoingMessage(
        '',
        this.socketServer.serverName,
        Date.now(),
        `User [${user.name}] disconnected!`
      );
      this.multicastMessage(message);
    }
    console.log(`Socket ${this.socket.id} disconnected`);
  }

  /**
   * Sets user information in global list of users
   * @param {string} name User name
   * @private
   */
  _setUser(name) {
    const user = new User(name);
    this.socketServer.users.set(this.socket, user);
  }

  /**
   * Sets socket server room attached to socket connection
   * @param {string} room
   * @private
   */
  _setRoom(room) {
    if (this.socketServer.isRoomExists(room)) {
      this.room = room;
    } else {
      this.room = this.socketServer.idGen.next().value;
    }
  }

  /**
   * Calls when user enters the room
   * @private
   */
  _onJoinRoom() {
    const username = this.socketServer.users.get(this.socket).name;
    console.log(`User ${username} joined to room #${this.room}`);

    this.sendRoomInfo();
    this.multicastMessage(
      new OutgoingMessage(
        '',
        this.socketServer.serverName,
        Date.now(),
        `User [${username}] connected!`
      )
    );
    this.multicastRoomUsers();
  }

  /**
   * Sends the room identifier to the socket
   */
  sendRoomInfo() {
    this.socket.emit(SocketEvents.socket.emit.chatEnter, this.room);
  }

  /**
   * Sends the message to all users in the room
   * @param {OutgoingMessage} message
   */
  multicastMessage(message) {
    this.socket
      .to(this.room)
      .emit(SocketEvents.socket.emit.newMessage, message);
    this.socket.emit(SocketEvents.socket.emit.newMessage, message);
  }

  /**
   * Sends (to all users in the room) list of all users in the room
   */
  multicastRoomUsers() {
    const roomUsers = this.socketServer.getRoomUsers(this.room);
    this.socket
      .to(this.room)
      .emit(SocketEvents.socket.emit.roomUsers, roomUsers);
    this.socket.emit(SocketEvents.socket.emit.roomUsers, roomUsers);
  }
}

module.exports = SocketController;
