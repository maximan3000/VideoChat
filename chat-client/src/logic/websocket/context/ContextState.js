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
};

function reducer(context, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_ID:
      return {...context, id: action.id};
    case ACTION_TYPE.CONNECT:
      return {...context, isConnected: true};
    case ACTION_TYPE.DISCONNECT:
      return ContextState;
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
    default:
      return context;
  }
}

export {ContextState, reducer, ACTION_TYPE};
