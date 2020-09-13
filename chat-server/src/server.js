const config = require('./config');
const HttpServerController = require('./http/HttpServerController');
const SocketServerController = require('./socket/SocketServerController');

const httpServerController = HttpServerController.create(config.port);
const socketController = SocketServerController.attach(httpServerController);

httpServerController.start();
