/**
 * WebRtc answer info
 */
export class AnswerContext {
  /**
   * @param {RTCSessionDescription} answer WebRtc SDP answer
   * @param {string} id Socket connection ID of the offer
   */
  constructor(answer, id) {
    this.answer = answer;
    this.id = id;
  }
}
