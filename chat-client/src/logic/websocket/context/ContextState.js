const ContextState = {
  id: null,
  isChatEntered: false,
  isConnected: false,
  message: null,
  room: null,
  users: null,
  emits: {
    enterRoom: null,
    sendMessage: null,
  },
  webrtc: {
    offerContext: null,
    answerContext: null,
    iceCandidateOffer: null,
    iceCandidateAnswer: null,
    emits: {
      sendOffer: null,
      sendAnswer: null,
      sendIceCandidateOffer: null,
      sendIceCandidateAnswer: null,
    },
  },
};

const ACTION_TYPE = {
  SET_ID: 0,
  CONNECT: 1,
  DISCONNECT: 2,
  CHAT_LEAVE: 3,
  SET_MESSAGE: 4,
  SET_ROOM: 5,
  SET_USERS: 6,
  SET_EMITS_ENTER_ROOM: 7,
  SET_EMITS_SEND_MESSAGE: 8,
  SET_OFFER_CONTEXT: 9,
  SET_ANSWER_CONTEXT: 10,
  SET_ICE_CANDIDATE_OFFER: 11,
  SET_ICE_CANDIDATE_ANSWER: 12,
  SET_EMIT_SEND_OFFER: 13,
  SET_EMIT_SEND_ANSWER: 14,
  SET_EMIT_SEND_ICE_CANDIDATE_OFFER: 15,
  SET_EMIT_SEND_ICE_CANDIDATE_ANSWER: 16,
};

// eslint-disable-next-line require-jsdoc
function reducer(context, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_ID:
      return {...context, id: action.id};
    case ACTION_TYPE.CONNECT:
      return {...context, isConnected: true};
    case ACTION_TYPE.DISCONNECT:
      return {...context, isChatEntered: false, isConnected: false};
    case ACTION_TYPE.CHAT_LEAVE:
      return {...context, isChatEntered: false};
    case ACTION_TYPE.SET_MESSAGE:
      return {...context, message: action.message};
    case ACTION_TYPE.SET_ROOM:
      return {...context, room: action.room, isChatEntered: true};
    case ACTION_TYPE.SET_USERS:
      return {...context, users: action.users};
    case ACTION_TYPE.SET_EMITS_ENTER_ROOM:
      return {
        ...context,
        emits: {...context.emits, enterRoom: action.enterRoom},
      };
    case ACTION_TYPE.SET_EMITS_SEND_MESSAGE:
      return {
        ...context,
        emits: {...context.emits, sendMessage: action.sendMessage},
      };
    case ACTION_TYPE.SET_OFFER_CONTEXT:
      return {
        ...context,
        webrtc: {...context.webrtc, offerContext: action.offerContext},
      };
    case ACTION_TYPE.SET_ANSWER_CONTEXT:
      return {
        ...context,
        webrtc: {...context.webrtc, answerContext: action.answerContext},
      };
    case ACTION_TYPE.SET_ICE_CANDIDATE_OFFER:
      return {
        ...context,
        webrtc: {
          ...context.webrtc,
          iceCandidateOffer: action.iceCandidateOffer,
        },
      };
    case ACTION_TYPE.SET_ICE_CANDIDATE_ANSWER:
      return {
        ...context,
        webrtc: {
          ...context.webrtc,
          iceCandidateAnswer: action.iceCandidateAnswer,
        },
      };
    case ACTION_TYPE.SET_EMIT_SEND_OFFER:
      return {
        ...context,
        webrtc: {
          ...context.webrtc,
          emits: {
            ...context.webrtc.emits,
            sendOffer: action.sendOffer,
          },
        },
      };
    case ACTION_TYPE.SET_EMIT_SEND_ANSWER:
      return {
        ...context,
        webrtc: {
          ...context.webrtc,
          emits: {
            ...context.webrtc.emits,
            sendAnswer: action.sendAnswer,
          },
        },
      };
    case ACTION_TYPE.SET_EMIT_SEND_ICE_CANDIDATE_OFFER:
      return {
        ...context,
        webrtc: {
          ...context.webrtc,
          emits: {
            ...context.webrtc.emits,
            sendIceCandidateOffer: action.sendIceCandidateOffer,
          },
        },
      };
    case ACTION_TYPE.SET_EMIT_SEND_ICE_CANDIDATE_ANSWER:
      return {
        ...context,
        webrtc: {
          ...context.webrtc,
          emits: {
            ...context.webrtc.emits,
            sendIceCandidateAnswer: action.sendIceCandidateAnswer,
          },
        },
      };
    default:
      return context;
  }
}

export {ContextState, reducer, ACTION_TYPE};
