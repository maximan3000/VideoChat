import React, {memo, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import {OutgoingMessage} from '../../logic/websocket/structs/outgoing/OutgoingMessage';
import {useSocketContext} from '../../logic/websocket/context/useSocketContext';
import {useFormEnterPress} from '../../logic/hooks/useFormEnterPress';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 10px 20px;
  display: flex;
`;

const StyledTextField = styled(TextField)`
  margin-right: 10px;
  flex: 1;
`;

/**
 * Form with new message input
 * @return {JSX.Element}
 * @constructor
 */
const MessageBoxInput = () => {
  const [text, setText] = useState('');
  const socketContext = useSocketContext();

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const sendMessage = () => {
    if (text.trim() !== '') {
      socketContext.sendMessage(new OutgoingMessage(text));
      setText('');
    }
  };

  const [onPressEnter, isFocus] = useFormEnterPress(sendMessage);

  return (
    <StyledPaper>
      <StyledTextField
        placeholder="Enter your message"
        value={text}
        onChange={handleChange}
        onKeyPress={onPressEnter}
        className="MessageBoxInput_field"
        focused={isFocus}
        autoFocus={true}
      />
      <Button
        onClick={sendMessage}
        variant="outlined"
        color="primary"
        disabled={!text}
      >
        Send
      </Button>
    </StyledPaper>
  );
};

export default memo(MessageBoxInput);
