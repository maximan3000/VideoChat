import React, { memo, useContext, useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./MessageBoxInput.css";
import { SocketContext } from "../SocketContext";

const MessageBoxInput = () => {
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const socket = useContext(SocketContext);
  const handleClick = () => {
    if (socket) {
      socket.emit("sendChatMessage", text);
      setText("");
    }
  };

  return (
    <Paper className="MessageBoxInput">
      <TextField
        placeholder="Enter your message"
        value={text}
        onChange={handleChange}
        className="MessageBoxInput_field"
      />
      <Button
        onClick={handleClick}
        variant="outlined"
        color="primary"
        disabled={!text}
      >
        Send
      </Button>
    </Paper>
  );
};

export default memo(MessageBoxInput);
