const SocketEvents = require('./../SocketEvents');
const User = require('./../struct/User');
const RoomConnection = require('./../struct/incoming/RoomConnection');
const OutgoingMessage = require('./../struct/outgoing/OutgoingMessage');
const IncomingMessage = require('./../struct/incoming/IncomingMessage');

/**
 * Partial logic of linked class. Implements chat behavior
 * @see SocketController
 */
function socketControllerChat() {
  /**
   * Calls when user trying to enter the room
   * @param {RoomConnection} roomConnection
   * @private
   */
  const onEnterRoom = (roomConnection) => {
    const roomCon = new RoomConnection(
      roomConnection.name,
      roomConnection.room
    );
    setUser(roomCon.name);
    setRoom(roomCon.room);
    this.socket.join(this.room, onJoinRoom.bind(this));
  };

  /**
   * Calls when websocket gets a user message
   * @param {IncomingMessage} message User message
   * @private
   */
  const onMessage = (message) => {
    const incoming = new IncomingMessage(message.text);
    const outgoing = new OutgoingMessage(
      this.socket.id,
      this.socketServer.users.get(this.socket).name,
      Date.now(),
      incoming.text
    );
    multicastMessage(outgoing);
    console.log('Got message: ', outgoing);
  };

  /**
   * Calls when websocket disconnect
   * @private
   */
  const onDisconnect = () => {
    const user = this.socketServer.users.get(this.socket);
    if (!!user) {
      multicastRoomUsers();
      const message = new OutgoingMessage(
        '',
        this.socketServer.serverName,
        Date.now(),
        `User [${user.name}] disconnected!`
      );
      multicastMessage(message);
    }
    console.log(`Socket ${this.socket.id} disconnected`);
  };

  /**
   * Sets user information in global list of users
   * @param {string} name User name
   * @private
   */
  const setUser = (name) => {
    const user = new User(name);
    this.socketServer.users.set(this.socket, user);
  };

  /**
   * Sets websocket server room attached to websocket partial
   * @param {string} room
   * @private
   */
  const setRoom = (room) => {
    if (this.socketServer.isRoomExists(room)) {
      this.room = room;
    } else {
      this.room = this.socketServer.idGen.next().value;
    }
  };

  /**
   * Calls when user enters the room
   * @private
   */
  const onJoinRoom = () => {
    const username = this.socketServer.users.get(this.socket).name;
    console.log(`User ${username} joined to room #${this.room}`);

    sendRoomInfo();
    multicastMessage(
      new OutgoingMessage(
        '',
        this.socketServer.serverName,
        Date.now(),
        `User [${username}] connected!`
      )
    );
    multicastRoomUsers();
  };

  /**
   * Sends the room identifier to the websocket
   */
  const sendRoomInfo = () => {
    this.socket.emit(SocketEvents.CHAT.EMIT.SUCCESS_ENTER_ROOM, this.room);
  };

  /**
   * Sends the message to all users in the room
   * @param {OutgoingMessage} message
   */
  const multicastMessage = (message) => {
    this.socket
      .to(this.room)
      .emit(SocketEvents.CHAT.EMIT.BROADCAST_MESSAGE, message);
    this.socket.emit(SocketEvents.CHAT.EMIT.BROADCAST_MESSAGE, message);
  };

  /**
   * Sends (to all users in the room) list of all users in the room
   */
  const multicastRoomUsers = () => {
    const roomUsers = this.socketServer.getRoomUsers(this.room);
    this.socket
      .to(this.room)
      .emit(SocketEvents.CHAT.EMIT.ROOM_USERS, roomUsers);
    this.socket.emit(SocketEvents.CHAT.EMIT.ROOM_USERS, roomUsers);
  };

  this.socket.on(SocketEvents.CHAT.ON.ROOM_ENTER, onEnterRoom.bind(this));
  this.socket.on(SocketEvents.CHAT.ON.MESSAGE, onMessage.bind(this));
  this.socket.on(SocketEvents.SERVER.DISCONNECT, onDisconnect.bind(this));
}

module.exports = socketControllerChat;
