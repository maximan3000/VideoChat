import React, { memo, useContext, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./LiveUserWindow.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { SocketContext } from "../SocketContext";

const LiveUserWindow = () => {
  const [users, setUsers] = useState([]);
  const socket = useContext(SocketContext);
  socket.on("liveRoomUsers", (users) => {
    console.log(users);
    if (users) {
      setUsers(users);
    }
  });

  return (
    <Paper className="LiveUserWindow">
      <Typography
        className="LiveUserWindow-header"
        variant="subtitle1"
        color="secondary"
        noWrap
      >
        Live users
      </Typography>
      <List>
        {users.map((value, index) => (
          <ListItem key={value}>
            <ListItemText primary={`${index + 1}. ${value}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default memo(LiveUserWindow);
