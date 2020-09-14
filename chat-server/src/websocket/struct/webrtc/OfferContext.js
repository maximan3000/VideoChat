/**
 * WebRtc offer info
 */
class OfferContext {
  /**
   * @param {object} offer WebRtc SDP - session descriptor
   * @param {string} id Socket connection ID (sender)
   */
  constructor(offer, id) {
    this.offer = offer;
    this.id = id;
  }
}

module.exports = OfferContext;