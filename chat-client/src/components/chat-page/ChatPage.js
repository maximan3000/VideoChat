import React, {memo} from 'react';
import MessageWindow from './MessagesWindow';
import MessageBoxInput from './MessageBoxInput';
import {Grid} from '@material-ui/core';
import LiveUserWindow from './LiveUserWindow';
import styled from 'styled-components';
import VideoBox from './VideoBox';

const StyledGrid = styled(Grid)`
  min-height: 200px;
  text-align: center;
`;

/**
 * Window with all chat components
 * @return {JSX.Element}
 * @constructor
 */
const ChatPage = () => {
  return (
    <Grid container spacing={3}>
      <StyledGrid item xs={12} />
      <Grid item xs={3}>
        <VideoBox />
      </Grid>
      <Grid item xs={6}>
        <MessageWindow />
        <MessageBoxInput />
      </Grid>
      <Grid item xs={3}>
        <LiveUserWindow />
      </Grid>
    </Grid>
  );
};

export default memo(ChatPage);
