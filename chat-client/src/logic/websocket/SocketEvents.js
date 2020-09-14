/**
 * The list of all supported websocket events
 * @see SocketController
 */
export const SocketEvents = {
  ON: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    SUCCESS_ROOM_ENTER: 'successEnter',
    ROOM_USERS: 'liveRoomUsers',
    MESSAGE: 'broadcastChatMessage',
  },
  EMIT: {
    ENTER_ROOM: 'enterRoom',
    SEND_MESSAGE: 'sendChatMessage',
  },
  WEB_RTC: {
    ON: {
      ANSWER: 'getAnswer',
      OFFER: 'getOffer',
      ICE_CANDIDATE_OFFER: 'getIceCandidateOffer',
      ICE_CANDIDATE_ANSWER: 'getIceCandidateAnswer',
    },
    EMIT: {
      SEND_OFFER: 'sendOffer',
      SEND_ANSWER: 'sendAnswer',
      SEND_ICE_CANDIDATE_OFFER: 'sendIceCandidateOffer',
      SEND_ICE_CANDIDATE_ANSWER: 'sendIceCandidateAnswer',
    },
  },
};
