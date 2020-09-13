const express = require('express');
const path = require('path');
const http = require('http');
const indexRouter = require('./routes');

/**
 * Http server controller.
 * @property {string} port Server port
 * @property {NodeJS.Server} httpServer Http server instace
 * @example
 * const controller = HttpServerController.create('3000');
 * controller.start();
 */
class HttpServerController {
  /**
   * Creates a singleton instance of http server.
   * @param {string} port
   * @return {HttpServerController} HttpServerController instance
   */
  static create(port) {
    return new HttpServerController(port);
  }

  // eslint-disable-next-line require-jsdoc
  constructor(port) {
    if (!!HttpServerController.instance) {
      return HttpServerController.instance;
    } else {
      this.port = port;
      this._express = express();
      this.httpServer = this._createServer();
      HttpServerController.instance = this;
    }
  }

  // eslint-disable-next-line require-jsdoc
  _createServer() {
    this._setupExpress();
    return http.createServer(this._express);
  }

  // eslint-disable-next-line require-jsdoc
  _setupExpress() {
    this._express.use(express.json());
    this._express.use(express.urlencoded({extended: false}));
    this._express.use(express.static(path.join(__dirname, './../../public')));
    this._express.use('*', indexRouter);
    this._express.set('port', this.port);
  }

  /**
   * Starts the http server listening.
   * Blocking action.
   */
  start() {
    console.log(`Http server listening on port: ${this.port}`);
    this.httpServer
      .listen(this.port)
      .on('error', (e) => console.log(e.message));
  }
}

module.exports = HttpServerController;
