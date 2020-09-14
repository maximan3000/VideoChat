/**
 * The list of all supported websocket events
 * @see SocketController
 */
const SocketEvents = {
  SERVER: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
  },
  CHAT: {
    EMIT: {
      SUCCESS_ENTER_ROOM: 'successEnter',
      ROOM_USERS: 'liveRoomUsers',
      BROADCAST_MESSAGE: 'broadcastChatMessage',
    },
    ON: {
      ROOM_ENTER: 'enterRoom',
      MESSAGE: 'sendChatMessage',
    },
  },
  WEB_RTC: {
    EMIT: {
      MULTICAST_OFFER: 'getOffer',
      SEND_ANSWER: 'getAnswer',
      MULTICAST_ICE_CANDIDATE_OFFER: 'getIceCandidateOffer',
      SEND_ICE_CANDIDATE_ANSWER: 'getIceCandidateAnswer',
    },
    ON: {
      OFFER: 'sendOffer',
      ANSWER: 'sendAnswer',
      ICE_CANDIDATE_OFFER: 'sendIceCandidateOffer',
      ICE_CANDIDATE_ANSWER: 'sendIceCandidateAnswer',
    },
  },
};

module.exports = SocketEvents;
