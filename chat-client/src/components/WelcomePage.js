import React, { memo, useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./WelcomePage.css";
import { SocketContext } from "../SocketContext";
import { useLocation  } from "react-router-dom";

const WelcomePage = () => {
  const [name, setName] = useState("");
  const location = useLocation();
  const socket = useContext(SocketContext);
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleClick = () => {
    socket.emit("sendName", { name: name, room: location.pathname.slice(1) });
  };

  return (
    <Paper className="WelcomePage_paper">
      <Typography variant="subtitle1" color="primary" component="h1">
        My chat server
      </Typography>
      <TextField
        id="username"
        label={name ? "Name" : "Enter your name"}
        value={name}
        onChange={handleChange}
        className="WelcomePage_field"
      />
      <Button
        variant="outlined"
        color="primary"
        disabled={!name}
        onClick={handleClick}
      >
        Join chat
      </Button>
    </Paper>
  );
};

export default memo(WelcomePage);
