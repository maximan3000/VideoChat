/**
 * Message sended to the websocket from client
 */
class IncomingMessage {
  /**
   * @constructor
   * @param {string} text Text of the message
   */
  constructor(text) {
    this.text = text;
  }
}

module.exports = IncomingMessage;
