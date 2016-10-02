"use strict";

/*
    Setting a websocket worker
 */
const port    = process.env.PORT || 3002,
      portR   = process.env.PORTR|| 3001,
      ws      = require('ws'),
      express = require('express'),
      url     = require('url'),
      bodyParser = require('body-parser'),
      app     = express(),

      user    = require('../domain/websocket/User.js'),
      authorize = require('../domain/websocket/index.js').authorize,
      userRouter = require('../domain/User.js'),

      WebSocketServer = ws.Server;

let errorMessage = 'UnAuthorized';

function assign(server, fn){
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/users', userRouter);

  let wss = new WebSocketServer({ server: server });
  wss.on('connection', (ws) => {
    let auth = ws.upgradeReq.headers["sec-websocket-key"]

    ws.on('message', (message) => {
      console.log('received: %s', message);
    });

    //ws.send('something');

    ws.on(user.create.url, (message) => {
      return user.create.handle(message, () => {
        return (ws.upgradeReq.headers["sec-websocket-key"]);
      });
    });

    ws.on(user.update.url, () => {
      return user.update.handle(message, () => {
        return (authorize(auth, message)) ? authorize(auth, message) : ws.send(errorMessage) || authorize(auth, message);
      });
    });

    ws.on(user.read.url, () => {
      return user.read.handle(message, () => {
        return (authorize(auth, message)) ? authorize(auth, message) : ws.send(errorMessage) || authorize(auth, message);
      });
    });
    ws.on(user.delete.url, () => {
      return user.delete.handle(message, () => {
        return (authorize(auth, message)) ? authorize(auth, message) : ws.send(errorMessage) || authorize(auth, message);
      });
    });

    ws.on('close', () => {
      console.log('stopping client interval');
    });
  });


  fn();
};

module.exports =  {
  port: port,
  portR: portR,
  app: app,
  ws: assign
};
