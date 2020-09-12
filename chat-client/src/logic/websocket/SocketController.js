import io from 'socket.io-client';
import {SocketEvents} from './SocketEvents';
import {Room} from './structs/incoming/Room';
import {User} from './structs/incoming/User';

/**
 * Controller of the chat socket
 */
export class SocketController {
  /**
   * @constructor
   * @param {string} uri URL:port of the socket
   */
  constructor(uri) {
    this._socket = io(uri);
  }

  /**
   * @return {string} Id of the socket connection
   */
  get id() {
    return this._socket.id;
  }

  /**
   * Do anything on call
   * @callback callback
   */

  /**
   * @param {callback} callback Calls when socket connect
   */
  onConnect(callback) {
    this._socket.on(SocketEvents.on.connect, () => {
      console.log('Socket connected');
      console.dir(this._socket);
      callback();
    });
  }

  /**
   * @param {callback} callback Calls when socket disconnect
   */
  onDisconnect(callback) {
    this._socket.on(SocketEvents.on.disconnect, () => {
      console.log('Socket disconnected');
      callback();
    });
  }

  /**
   * @callback onChatEnterCallback
   * @param {Room} The room info
   */

  /**
   * @param {onChatEnterCallback} callback Calls when current user successfully enter to the room
   */
  onChatEnter(callback) {
    this._socket.on(SocketEvents.on.chatEnter, (room) => {
      console.log('Room entered');
      console.dir(room);
      callback(new Room(room));
    });
  }

  /**
   * @callback onRoomUsersCallback
   * @param {User[]} users The list of users
   */

  /**
   * @param {onRoomUsersCallback} callback Calls when someone enters or leaves the room
   */
  onRoomUsers(callback) {
    this._socket.on(SocketEvents.on.roomUsers, (users) => {
      console.log('List of room users changed');
      console.dir(users);
      const newUsers = users.map((value) => new User(value));
      callback(newUsers);
    });
  }

  /**
   * @callback onUserMessageCallback
   * @param {IncomingMessage} message
   */

  /**
   * @param {onUserMessageCallback} callback Calls when a new message arrives
   */
  onMessage(callback) {
    this._socket.on(SocketEvents.on.newMessage, (message) => {
      console.log('New message arrived');
      console.dir(message);
      callback(message);
    });
  }

  /**
   * Connect to room of the chat
   * @param {RoomConnection} roomConnection Arguments needed to enter the room of the chat
   */
  enterRoom(roomConnection) {
    console.log('Connecting to room');
    console.dir(roomConnection);
    this._socket.emit(SocketEvents.emit.enterRoom, {
      name: roomConnection.username,
      room: roomConnection.room,
    });
  }

  /**
   * Send message to all users in the same room
   * @param {OutgoingMessage} message
   */
  sendMessage(message) {
    console.log('Sending message');
    console.dir(message);
    this._socket.emit(SocketEvents.emit.sendMessage, message);
  }
}
