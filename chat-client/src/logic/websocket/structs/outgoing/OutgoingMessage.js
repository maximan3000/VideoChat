/**
 * Message sended to the socket from client
 */
export class OutgoingMessage {
  /**
   * @constructor
   * @param {string} text Text of the message
   */
  constructor(text) {
    this.text = text;
  }
}
