import {AnswerContext} from './structs/webrtc/AnswerContext';
import {Config} from '../../Config';

export class WebRtcController {
  constructor() {
    if (!!WebRtcController.instance) {
      return WebRtcController.instance;
    } else {
      this._init();
      WebRtcController.instance = this;
    }
  }

  _init() {
    this.rtc = new RTCPeerConnection(Config.webrtc.config);
    this.remoteStream = new MediaStream();
    this.localStream = new MediaStream();
    // TODO For many connections this.RtcConnections = new Map();
  }

  async _getLocalStream() {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  }

  async onAnswer(answerContext, sendIceCandidate) {
    await this.rtc.setRemoteDescription(
      new RTCSessionDescription(answerContext.answer)
    );
    this._setIceListener(sendIceCandidate);
  }

  async onOffer(offerContext, sendIceCandidate, sendAnswer) {
    this.rtc.addEventListener('track', async (event) => {
      this.remoteStream.addTrack(event.track);
    });
    await this.rtc.setRemoteDescription(
      new RTCSessionDescription(offerContext.offer)
    );
    const answer = await this.rtc.createAnswer();
    await this.rtc.setLocalDescription(answer);
    sendAnswer(new AnswerContext(answer, offerContext.id));
    this._setIceListener(sendIceCandidate);
  }

  async addIceCandidate(iceCandidateContext) {
    try {
      await this.rtc.addIceCandidate(iceCandidateContext.iceCandidate);
    } catch (e) {
      console.log('Error adding received ice candidate');
    }
  }

  async sendOffer(sendOffer) {
    this.localStream = await this._getLocalStream();
    this.localStream.getTracks().forEach(async (track) => {
      this.rtc.addTrack(track, this.localStream);
    });
    const offer = await this.rtc.createOffer();
    await this.rtc.setLocalDescription(offer);
    sendOffer(offer);
  }

  _setIceListener(sendIceCandidate) {
    this.rtc.addEventListener('icecandidate', (event) => {
      if (event.candidate) {
        sendIceCandidate(event.candidate);
      }
    });
  }
}
