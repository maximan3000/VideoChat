import React, { memo } from "react";
import { CardHeader } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import formatTimestamp from "../utils/formatTimestamp";
import cx from "classnames";
import "./MessageBox.css";

const MessageBox = ({ timestamp, sender, text, isOwn }) => (
  <Card
    className={cx("MessageBox", `MessageBox__owner-${isOwn ? "me" : "other"}`)}
    key={timestamp + sender}
    variant="outlined"
  >
    <CardHeader
      title={
        <Typography variant="subtitle1" color="primary">
          {sender}
        </Typography>
      }
      subheader={
        <Typography variant="subtitle2" color="textSecondary">
          {formatTimestamp(timestamp)}
        </Typography>
      }
    />
    <CardContent>
      <Typography>{text}</Typography>
    </CardContent>
  </Card>
);

export default memo(MessageBox);
