export const Config = {
  socket: {
    uri: '127.0.0.1:3001',
  },
  webrtc: {
    config: {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]},
  },
};
