"use strict";

/*
    Setting a websocket worker
 */
const port    = process.env.PORT || 3002,
      portR   = process.env.PORTR|| 3001,
      ws      = require('ws'),
      express = require('express'),
      url     = require('url'),
      app     = express(),

      WebSocketServer = ws.Server;


function assign(server, fn){
  let wss = new WebSocketServer({ server: server });

  wss.on('connection', (ws) => {
    let auth = ws.upgradeReq.headers["sec-websocket-key"];

    ws.on('message', (message) => {
      console.log('received: %s', message);
    });

    ws.send('something');

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
