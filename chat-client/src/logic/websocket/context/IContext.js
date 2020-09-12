/**
 * Access interface to socket context
 */
export class IContext {
  /**
   * @constructor
   * @param {ContextState} context Current state of socket context
   * @see useSocketContext
   */
  constructor(context) {
    this._context = context;
  }

  /**
   * @return {string} Id of current socket connection
   */
  get id() {
    return this._context.id;
  }

  /**
   * @return {boolean} Return true if the client has connected to the chat
   */
  get isChatEntered() {
    return this._context.isChatEntered;
  }

  /**
   * @return {boolean} Return true if socket has connected
   */
  get isConnected() {
    return this._context.isConnected;
  }

  /**
   * @return {IncomingMessage} The last message gotten from the socket
   */
  get message() {
    return this._context.message;
  }

  /**
   * @return {Room} The room the client is in
   */
  get room() {
    return this._context.room;
  }

  /**
   * @return {User[]} List of all users that are in the same room right now
   */
  get users() {
    return this._context.users;
  }

  /**
   * @see SocketController.enterRoom
   * @param {RoomConnection} roomConnection
   */
  enterRoom(roomConnection) {
    this._context.emits.enterRoom(roomConnection);
  }

  /**
   * @see SocketController.sendMessage
   * @param {OutgoingMessage} message
   */
  sendMessage(message) {
    this._context.emits.sendMessage(message);
  }
}
