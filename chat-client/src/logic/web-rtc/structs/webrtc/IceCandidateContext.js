/**
 * WebRtc ICE candidate info
 */
export class IceCandidateContext {
  /**
   * @param {RTCIceCandidate} iceCandidate WebRtc ICE candidate
   * @param {string} id Socket connection ID of the offer
   */
  constructor(iceCandidate, id) {
    this.iceCandidate = iceCandidate;
    this.id = id;
  }
}
