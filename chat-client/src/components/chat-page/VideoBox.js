import React, {memo, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {useSocketContext} from '../../logic/websocket/context/useSocketContext';
import {IceCandidateContext} from '../../logic/web-rtc/structs/webrtc/IceCandidateContext';
import {WebRtcController} from '../../logic/web-rtc/WebRtcController';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';

const Video = styled.video`
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
`;

/**
 * Block with video content
 * @return {JSX.Element}
 * @constructor
 */
const VideoBox = () => {
  const videoRef = useRef(null);
  const context = useSocketContext();
  const [rtcController, setRtcController] = useState(null);

  useEffect(() => {
    const controller = new WebRtcController();
    setRtcController(controller);
    videoRef.current.srcObject = controller.remoteStream;
  }, []);

  useEffect(() => {
    if (context.answerContext) {
      rtcController.onAnswer(context.answerContext, (iceCandidate) =>
        context.sendIceCandidateOffer(iceCandidate)
      );
    }
  }, [context.answerContext]);

  useEffect(() => {
    if (context.offerContext) {
      rtcController.onOffer(
        context.offerContext,
        (iceCandidate) =>
          context.sendIceCandidateAnswer(
            new IceCandidateContext(iceCandidate, context.offerContext.id)
          ),
        (answerContext) => context.sendAnswer(answerContext)
      );
    }
  }, [context.offerContext]);

  useEffect(() => {
    if (context.iceCandidateAnswer) {
      rtcController.addIceCandidate(context.iceCandidateAnswer);
    }
  }, [context.iceCandidateAnswer]);

  useEffect(() => {
    if (context.iceCandidateOffer) {
      rtcController.addIceCandidate(context.iceCandidateOffer);
    }
  }, [context.iceCandidateOffer]);

  const startTranslation = () => {
    if (context.users.length === 2) {
      rtcController.sendOffer((offer) => context.sendOffer(offer));
    } else {
      alert('Video translation available for 2 users in room only');
    }
  };

  return (
    <Card>
      <CardMedia>
        <Button onClick={startTranslation}>translate video</Button>
      </CardMedia>
      <CardContent>
        <Video
          ref={videoRef}
          title="Local webcam video"
          autoPlay={true}
          playsinlines
        />
      </CardContent>
    </Card>
  );
};

export default memo(VideoBox);
