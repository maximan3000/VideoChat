const SocketEvents = require('./../SocketEvents');
const OfferContext = require('../struct/webrtc/OfferContext');
const AnswerContext = require('../struct/webrtc/AnswerContext');
const IceCandidateContext = require('../struct/webrtc/IceCandidateContext');

/**
 * Partial logic of linked class. Implements WebRtc behavior
 * @see SocketController
 */
function socketControllerWebRtc() {
  /**
   * Broadcast WebRtc offer to all users in the room
   * @param {object} offer WebRtc SDP (offer)
   */
  const onOffer = (offer) => {
    const context = new OfferContext(offer, this.socket.id);
    console.log('Get WebRtc offer', context);
    this.socket
      .to(this.room)
      .emit(SocketEvents.WEB_RTC.EMIT.MULTICAST_OFFER, context);
  };

  /**
   * Send WebRtc answer to the specified socket
   * @param {AnswerContext} answerContext WebRtc SDP (answer) with sender socket id
   */
  const onAnswer = (answerContext) => {
    const context = new AnswerContext(answerContext.answer, this.socket.id);
    console.log('Get WebRtc answer', context);
    const target = this.socketServer.getSocketById(answerContext.id);
    target.emit(SocketEvents.WEB_RTC.EMIT.SEND_ANSWER, context);
  };

  /**
   * Broadcast WebRtc ICE candidate to all users in the room
   * @param {object} iceCandidate WebRtc ICE candidate (from offer)
   */
  const onIceCandidateOffer = (iceCandidate) => {
    const context = new IceCandidateContext(iceCandidate, this.socket.id);
    console.log('Get WebRtc ice candidate from offer', context);
    this.socket
      .to(this.room)
      .emit(SocketEvents.WEB_RTC.EMIT.MULTICAST_ICE_CANDIDATE_OFFER, context);
  };

  /**
   * Send WebRtc ICE candidate to the specified socket
   * @param {IceCandidateContext} iceCandidateContext WebRtc ICE candidate (from answer) with sender socket id
   */
  const onIceCandidateAnswer = (iceCandidateContext) => {
    const context = new IceCandidateContext(
      iceCandidateContext.iceCandidate,
      this.socket.id
    );
    console.log('Get WebRtc ice candidate from answer', context);
    const target = this.socketServer.getSocketById(iceCandidateContext.id);
    target.emit(SocketEvents.WEB_RTC.EMIT.SEND_ICE_CANDIDATE_ANSWER, context);
  };

  this.socket.on(SocketEvents.WEB_RTC.ON.OFFER, onOffer.bind(this));
  this.socket.on(SocketEvents.WEB_RTC.ON.ANSWER, onAnswer.bind(this));
  this.socket.on(
    SocketEvents.WEB_RTC.ON.ICE_CANDIDATE_OFFER,
    onIceCandidateOffer.bind(this)
  );
  this.socket.on(
    SocketEvents.WEB_RTC.ON.ICE_CANDIDATE_ANSWER,
    onIceCandidateAnswer.bind(this)
  );
}

module.exports = socketControllerWebRtc;
