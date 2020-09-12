import React, {memo} from 'react';
import {CardHeader} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import formatTimestamp from '../../utils/formatTimestamp';
import styled from 'styled-components';

const Message = styled(Card)`
  display: inline-block;
  align-self: ${(props) => (props.ismine ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
  max-width: 60%;
`;

/**
 * Block with message content
 * @param {IncomingMessage} message
 * @param {boolean} isown
 * @return {JSX.Element}
 * @constructor
 */
const MessageBox = ({message, isown}) => (
  <Message
    key={message.timestamp + message.sender}
    variant="outlined"
    ismine={isown ? 1 : 0}
  >
    <CardHeader
      title={
        <Typography variant="subtitle1" color="primary">
          {message.sender}
        </Typography>
      }
      subheader={
        <Typography variant="subtitle2" color="textSecondary">
          {formatTimestamp(message.timestamp)}
        </Typography>
      }
    />
    <CardContent>
      <Typography>{message.text}</Typography>
    </CardContent>
  </Message>
);

export default memo(MessageBox);
