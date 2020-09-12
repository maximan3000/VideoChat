import React, {memo, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useSocketContext} from '../../logic/websocket/context/useSocketContext';
import {useLocation} from 'react-router-dom';
import {RoomConnection} from '../../logic/websocket/structs/outgoing/RoomConnection';
import {useFormEnterPress} from '../../logic/hooks/useFormEnterPress';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;
const StyledTextField = styled(TextField)`
  margin: 10px 0;
`;

/**
 * Form with name of user
 * @return {JSX.Element}
 * @constructor
 */
const WelcomePage = () => {
  const [name, setName] = useState('');
  const location = useLocation();
  const socketContext = useSocketContext();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const enterRoom = () => {
    if (socketContext.isConnected) {
      socketContext.enterRoom(
        new RoomConnection(name, location.pathname.slice(1))
      );
    }
  };

  const [onPressEnter, isFocus] = useFormEnterPress(enterRoom);

  return (
    <StyledPaper>
      <Typography variant="subtitle1" color="primary" component="h1">
        My chat server
      </Typography>
      <StyledTextField
        id="username"
        label={name ? 'Name' : 'Enter your name'}
        value={name}
        onChange={handleChange}
        className="WelcomePage_field"
        onKeyPress={onPressEnter}
        focused={isFocus}
        autoFocus={true}
      />
      <Button
        variant="outlined"
        color="primary"
        disabled={!name}
        onClick={enterRoom}
      >
        Join chat
      </Button>
    </StyledPaper>
  );
};

export default memo(WelcomePage);
