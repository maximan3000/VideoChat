import React, {useReducer, useEffect} from 'react';
import {Config} from '../Config';
import {SocketContext} from '../logic/websocket/context/SocketContext';
import {SocketController} from '../logic/websocket/SocketController';
import {
  ContextState,
  ACTION_TYPE,
  reducer,
} from '../logic/websocket/context/ContextState';

// eslint-disable-next-line valid-jsdoc
/**
 * Link websocket context with websocket controller
 * @see ContextState
 * @see SocketController
 * @return {JSX.Element}
 * @constructor
 */
export const SocketManager = (props) => {
  const [context, dispatchContext] = useReducer(reducer, ContextState);

  useEffect(() => {
    const socket = new SocketController(Config.socket.uri);
    socket.onConnect(() => {
      dispatchContext({type: ACTION_TYPE.SET_ID, id: socket.id});
      dispatchContext({type: ACTION_TYPE.CONNECT});
    });
    socket.onDisconnect(() => {
      dispatchContext({type: ACTION_TYPE.DISCONNECT});
    });
    socket.onChatEnter((room) => {
      dispatchContext({type: ACTION_TYPE.SET_ROOM, room: room});
    });
    socket.onRoomUsers((users) => {
      dispatchContext({type: ACTION_TYPE.SET_USERS, users: users});
    });
    socket.onMessage((message) => {
      dispatchContext({type: ACTION_TYPE.SET_MESSAGE, message: message});
    });
    socket.onOffer((offerContext) => {
      dispatchContext({
        type: ACTION_TYPE.SET_OFFER_CONTEXT,
        offerContext: offerContext,
      });
    });
    socket.onAnswer((answerContext) => {
      dispatchContext({
        type: ACTION_TYPE.SET_ANSWER_CONTEXT,
        answerContext: answerContext,
      });
    });
    socket.onIceCandidateOffer((iceCandidateContext) => {
      dispatchContext({
        type: ACTION_TYPE.SET_ICE_CANDIDATE_OFFER,
        iceCandidateOffer: iceCandidateContext,
      });
    });
    socket.onIceCandidateAnswer((iceCandidateContext) => {
      dispatchContext({
        type: ACTION_TYPE.SET_ICE_CANDIDATE_ANSWER,
        iceCandidateAnswer: iceCandidateContext,
      });
    });

    dispatchContext({
      type: ACTION_TYPE.SET_EMITS_ENTER_ROOM,
      enterRoom: (roomConnection) => socket.enterRoom(roomConnection),
    });
    dispatchContext({
      type: ACTION_TYPE.SET_EMITS_SEND_MESSAGE,
      sendMessage: (message) => socket.sendMessage(message),
    });
    dispatchContext({
      type: ACTION_TYPE.SET_EMIT_SEND_OFFER,
      sendOffer: (offer) => socket.sendOffer(offer),
    });
    dispatchContext({
      type: ACTION_TYPE.SET_EMIT_SEND_ANSWER,
      sendAnswer: (answerContext) => socket.sendAnswer(answerContext),
    });
    dispatchContext({
      type: ACTION_TYPE.SET_EMIT_SEND_ICE_CANDIDATE_OFFER,
      sendIceCandidateOffer: (iceCandidate) =>
        socket.sendIceCandidateOffer(iceCandidate),
    });
    dispatchContext({
      type: ACTION_TYPE.SET_EMIT_SEND_ICE_CANDIDATE_ANSWER,
      sendIceCandidateAnswer: (iceCandidateContext) =>
        socket.sendIceCandidateAnswer(iceCandidateContext),
    });
  }, []);

  return (
    <SocketContext.Provider value={context}>
      {props.children}
    </SocketContext.Provider>
  );
};
