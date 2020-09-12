/**
 * Arguments needed to connect to room
 */
export class RoomConnection {
  /**
   * @constructor
   * @param {string} username Name of user
   * @param {string} room Name of room
   */
  constructor(username, room) {
    this.username = username;
    this.room = room;
  }
}
