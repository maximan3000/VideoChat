import React, { memo, useContext, useState } from "react";
import "./MessageWindow.css";
import Paper from "@material-ui/core/Paper";
import MessageBox from "./MessageBox";
import { SocketContext } from "../SocketContext";

const MessageWindow = () => {
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  socket.on("broadcastChatMessage", (message) => {
    const newMessage = {
      timestamp: message.timestamp,
      sender: message.sender,
      text: message.text,
      isOwn: message.id === socket.id,
    };
    setMessages([...messages, newMessage]);
  });

  socket.on("serverMessage", (message) => {
    const newMessage = {
      timestamp: message.timestamp,
      sender: "System",
      text: message.text,
      isOwn: false,
    };
    setMessages([...messages, newMessage]);
  });

  return (
    <Paper className="MessageWindow">
      {messages.map(({ timestamp, sender, text, isOwn }) => (
        <MessageBox
          key={timestamp}
          timestamp={timestamp}
          sender={sender}
          text={text}
          isOwn={isOwn}
        />
      ))}
    </Paper>
  );
};

export default memo(MessageWindow);
