/**
 * WebRtc iceCandidate info
 */
class IceCandidateContext {
  /**
   * @param {object} iceCandidate WebRtc ICE candidate
   * @param {string} id Socket connection ID
   */
  constructor(iceCandidate, id) {
    this.iceCandidate = iceCandidate;
    this.id = id;
  }
}

module.exports = IceCandidateContext;
