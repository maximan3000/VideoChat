/**
 * WebRtc offer info
 */
export class OfferContext {
  /**
   * @param {RTCSessionDescription} offer WebRtc SDP offer
   * @param {string} id Socket connection ID (sender)
   */
  constructor(offer, id) {
    this.offer = offer;
    this.id = id;
  }
}
