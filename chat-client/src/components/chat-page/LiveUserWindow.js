import React, {memo, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useSocketContext} from '../../logic/websocket/context/useSocketContext';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 10px 20px;
  margin-bottom: 20px;
`;

/**
 * Window with list of all room users
 * @return {JSX.Element}
 * @constructor
 */
const LiveUserWindow = () => {
  const [users, setUsers] = useState([]);
  const socketContext = useSocketContext();

  useEffect(() => {
    if (socketContext.users) {
      setUsers(socketContext.users);
    }
  }, [socketContext.users, users]);

  return (
    <StyledPaper>
      <Typography variant="subtitle1" color="secondary" noWrap>
        Live users
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={user.name}>
            <ListItemText primary={`${index + 1}. ${user.name}`} />
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default memo(LiveUserWindow);
