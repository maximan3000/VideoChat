/**
 * Information needed to enter websocket server room
 */
class RoomConnection {
  /**
   * @constructor
   * @param {string} name Name of user
   * @param {string} room Socket server room identifier
   */
  constructor(name, room) {
    this.name = name;
    this.room = room;
  }
}

module.exports = RoomConnection;
