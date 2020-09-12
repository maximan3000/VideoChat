import React, {useEffect} from 'react';
import {Container} from '@material-ui/core';
import WelcomePage from './welcome-page/WelcomePage';
import {StylesProvider} from '@material-ui/styles';
import ChatPage from './chat-page/ChatPage';
import {useHistory} from 'react-router-dom';
import {useSocketContext} from '../logic/websocket/context/useSocketContext';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  min-height: 100vh;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const StyledContainerModal = styled(StyledContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Root of application components
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
  const history = useHistory();
  const socketContext = useSocketContext();

  useEffect(() => {
    if (socketContext.isChatEntered === true) {
      history.push(`/${socketContext.room.name}`);
    }
  }, [history, socketContext.isChatEntered, socketContext.room]);

  return (
    <StylesProvider injectFirst>
      {!socketContext.isChatEntered ? (
        <StyledContainerModal>
          <WelcomePage />
        </StyledContainerModal>
      ) : (
        <StyledContainer>
          <ChatPage />
        </StyledContainer>
      )}
    </StylesProvider>
  );
};

export default App;
