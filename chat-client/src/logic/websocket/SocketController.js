import io from 'socket.io-client';
import {SocketEvents} from './SocketEvents';
import {Room} from './structs/incoming/Room';
import {User} from './structs/incoming/User';

/**
 * Controller of the chat websocket
 */
export class SocketController {
  /**
   * @constructor
   * @param {string} uri URL:port of the websocket
   */
  constructor(uri) {
    this._socket = io(uri);
  }

  /**
   * @return {string} Id of the websocket partial
   */
  get id() {
    return this._socket.id;
  }

  /**
   * Do anything on call
   * @callback callback
   */

  /**
   * @param {callback} callback Calls when websocket connect
   */
  onConnect(callback) {
    this._socket.on(SocketEvents.ON.CONNECT, () => {
      console.log('Socket connected');
      console.dir(this._socket);
      callback();
    });
  }

  /**
   * @param {callback} callback Calls when websocket disconnect
   */
  onDisconnect(callback) {
    this._socket.on(SocketEvents.ON.DISCONNECT, () => {
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
    this._socket.on(SocketEvents.ON.SUCCESS_ROOM_ENTER, (room) => {
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
    this._socket.on(SocketEvents.ON.ROOM_USERS, (users) => {
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
    this._socket.on(SocketEvents.ON.MESSAGE, (message) => {
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
    this._socket.emit(SocketEvents.EMIT.ENTER_ROOM, {
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
    this._socket.emit(SocketEvents.EMIT.SEND_MESSAGE, message);
  }

  /**
   * @callback onOfferCallback
   * @param {OfferContext} offer
   */

  /**
   * @param {onOfferCallback} callback Calls when WebRtc offer arrives
   */
  onOffer(callback) {
    this._socket.on(SocketEvents.WEB_RTC.ON.OFFER, (offerContext) => {
      console.log('Got WebRtc offer');
      console.dir(offerContext);
      callback(offerContext);
    });
  }

  /**
   * @callback onAnswerCallback
   * @param {AnswerContext} offer
   */

  /**
   * @param {onAnswerCallback} callback Calls when WebRtc answer arrives
   */
  onAnswer(callback) {
    this._socket.on(SocketEvents.WEB_RTC.ON.ANSWER, (answerContext) => {
      console.log('Got WebRtc answer');
      console.dir(answerContext);
      callback(answerContext);
    });
  }

  /**
   * @callback onIceCandidateOfferCallback
   * @param {IceCandidateContext} iceCandidate
   */

  /**
   * @param {onIceCandidateOfferCallback} callback Calls when iceCandidate arrives from offer
   */
  onIceCandidateOffer(callback) {
    this._socket.on(
      SocketEvents.WEB_RTC.ON.ICE_CANDIDATE_OFFER,
      (iceCandidate) => {
        console.log('Got WebRtc iceCandidate from offer');
        console.dir(iceCandidate);
        callback(iceCandidate);
      }
    );
  }

  /**
   * @callback onIceCandidateAnswerCallback
   * @param {IceCandidateContext} iceCandidate
   */

  /**
   * @param {onIceCandidateAnswerCallback} callback Calls when iceCandidate arrives from answer
   */
  onIceCandidateAnswer(callback) {
    this._socket.on(
      SocketEvents.WEB_RTC.ON.ICE_CANDIDATE_ANSWER,
      (iceCandidate) => {
        console.log('Got WebRtc iceCandidate from answer');
        console.dir(iceCandidate);
        callback(iceCandidate);
      }
    );
  }

  /**
   * Send WebRtc offer to all users in room
   * @param {RTCSessionDescription} offer
   */
  sendOffer(offer) {
    console.log('Sending WebRtc offer');
    console.dir(offer);
    this._socket.emit(SocketEvents.WEB_RTC.EMIT.SEND_OFFER, offer);
  }

  /**
   * Send WebRtc answer to the specified socket id
   * @param {AnswerContext} answer Answer SDP with socket id of offer
   */
  sendAnswer(answer) {
    console.log('Sending WebRtc answer');
    console.dir(answer);
    this._socket.emit(SocketEvents.WEB_RTC.EMIT.SEND_ANSWER, answer);
  }

  /**
   * Send WebRtc ICE candidate from offer to all users in room
   * @param {RTCIceCandidate} iceCandidate
   */
  sendIceCandidateOffer(iceCandidate) {
    console.log('Sending WebRtc ICE candidate from offer');
    console.dir(iceCandidate);
    this._socket.emit(
      SocketEvents.WEB_RTC.EMIT.SEND_ICE_CANDIDATE_OFFER,
      iceCandidate
    );
  }

  /**
   * Send WebRtc ICE candidate from answer to the specified socket id
   * @param {IceCandidateContext} iceCandidate
   */
  sendIceCandidateAnswer(iceCandidate) {
    console.log('Sending WebRtc ICE candidate from answer');
    console.dir(iceCandidate);
    this._socket.emit(
      SocketEvents.WEB_RTC.EMIT.SEND_ICE_CANDIDATE_ANSWER,
      iceCandidate
    );
  }
}
