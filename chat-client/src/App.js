import React, { useEffect, useState } from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import WelcomePage from "./components/WelcomePage";
import cx from "classnames";
import { StylesProvider } from "@material-ui/styles";
import ChatPage from "./components/ChatPage";
import { SocketContext } from "./SocketContext";
import Socket from "socket.io-client";
import { useHistory } from "react-router-dom";

const App = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [socket, setSocket] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const newSocket = Socket.connect("127.0.0.1:3001");
    setSocket(newSocket);
    newSocket.on("successEnter", (room) => {
      history.push(`/${room}`);
      setIsJoined(true);
    });
    return () => socket && socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <StylesProvider injectFirst>
        <Container
          className={cx("App_container", !isJoined && "App_container__modal")}
        >
          {!isJoined ? <WelcomePage /> : <ChatPage />}
        </Container>
      </StylesProvider>
    </SocketContext.Provider>
  );
};

export default App;
