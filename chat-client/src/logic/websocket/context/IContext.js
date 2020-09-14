/**
 * Access interface to websocket context
 */
export class IContext {
  /**
   * @constructor
   * @param {ContextState} context Current state of websocket context
   * @see useSocketContext
   */
  constructor(context) {
    this._context = context;
  }

  /**
   * @return {string} Id of current websocket partial
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
   * @return {boolean} Return true if websocket has connected
   */
  get isConnected() {
    return this._context.isConnected;
  }

  /**
   * @return {IncomingMessage} The last message gotten from the websocket
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
   * @return {OfferContext} The last offer context gotten from the websocket
   */
  get offerContext() {
    return this._context.webrtc.offerContext;
  }

  /**
   * @return {AnswerContext} The last answer context gotten from the websocket
   */
  get answerContext() {
    return this._context.webrtc.answerContext;
  }

  /**
   * @return {IceCandidateContext} The last ice candidate context from offer gotten from the websocket
   */
  get iceCandidateOffer() {
    return this._context.webrtc.iceCandidateOffer;
  }

  /**
   * @return {IceCandidateContext} The last ice candidate context from answer gotten from the websocket
   */
  get iceCandidateAnswer() {
    return this._context.webrtc.iceCandidateAnswer;
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

  /**
   * @see SocketController.sendOffer
   * @param {RTCSessionDescription} offer
   */
  sendOffer(offer) {
    this._context.webrtc.emits.sendOffer(offer);
  }

  /**
   * @see SocketController.sendAnswer
   * @param {AnswerContext} answerContext
   */
  sendAnswer(answerContext) {
    this._context.webrtc.emits.sendAnswer(answerContext);
  }

  /**
   * @see SocketController.sendIceCandidateOffer
   * @param {RTCIceCandidate} iceCandidate
   */
  sendIceCandidateOffer(iceCandidate) {
    this._context.webrtc.emits.sendIceCandidateOffer(iceCandidate);
  }

  /**
   * @see SocketController.sendIceCandidateAnswer
   * @param {IceCandidateContext} iceCandidateContext
   */
  sendIceCandidateAnswer(iceCandidateContext) {
    this._context.webrtc.emits.sendIceCandidateAnswer(iceCandidateContext);
  }
}
