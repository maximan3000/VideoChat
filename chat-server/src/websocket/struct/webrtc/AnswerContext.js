/**
 * WebRtc answer info
 */
class AnswerContext {
  /**
   * @param {object} answer WebRtc SDP - session descriptor
   * @param {string} id Socket connection ID (target)
   */
  constructor(answer, id) {
    this.answer = answer;
    this.id = id;
  }
}

module.exports = AnswerContext;
