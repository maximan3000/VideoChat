import React, { memo } from "react";
import "./ChatPage.css";
import MessageWindow from "./MessageWindow";
import MessageBoxInput from "./MessageBoxInput";
import { Grid } from "@material-ui/core";
import LiveUserWindow from "./LiveUserWindow";

const ChatPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid className="ChatPage-header" item xs={12} />
      <Grid item xs={3} />
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
