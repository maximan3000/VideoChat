import React, {memo, useEffect, useReducer, useRef} from 'react';
import Paper from '@material-ui/core/Paper';
import MessageBox from './MessageBox';
import {useSocketContext} from '../../logic/websocket/context/useSocketContext';
import styled from 'styled-components';

const Window = styled(Paper)`
  height: 400px;
  overflow: auto;
  margin-bottom: 20px;
`;

const Container = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: unsafe flex-end;
  min-height: 90%;
`;

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_MESSAGE:
      if (!action.message) return state;
      return [...state, action.message];
    default:
      return state;
  }
}
const ACTION_TYPES = {
  ADD_MESSAGE: 0,
};

/**
 * Window with all messages
 * @return {JSX.Element}
 * @constructor
 */
const MessagesWindow = () => {
  const [messages, dispatchMessages] = useReducer(reducer, []);
  const socketContext = useSocketContext();
  const lastMessageRef = useRef(null);

  const scrollToBottom = () => {
    lastMessageRef.current.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    dispatchMessages({
      type: ACTION_TYPES.ADD_MESSAGE,
      message: socketContext.message,
    });
  }, [socketContext.message]);

  useEffect(scrollToBottom, [messages]);

  return (
    <Window>
      <Container>
        {messages.map((message) => (
          <MessageBox
            key={message.timestamp}
            message={message}
            isown={message.id === socketContext.id}
          />
        ))}
        <div ref={lastMessageRef} />
      </Container>
    </Window>
  );
};

export default memo(MessagesWindow);
