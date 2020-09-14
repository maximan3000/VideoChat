const config = require('./config');
const HttpServerController = require('./http/HttpServerController');
const SocketServerController = require('./websocket/SocketServerController');

const httpServerController = HttpServerController.create(config.port);
SocketServerController.attach(httpServerController);

httpServerController.start();
