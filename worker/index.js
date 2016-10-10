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


      authorize = require('../domain/websocket/index.js').authorize,

      WebSocketServer = ws.Server;

let errorMessage = 'UnAuthorized';

function assign(server, fn){
  let wss = new WebSocketServer({ server: server,  autoAcceptConnections: true });

  wss.broadcast = function broadcast(data) {
      wss.clients.forEach(function each(client) {
        client.send(data);
      });
  };

  wss.on('connection', (ws) => {
    let auth = ws.upgradeReq.headers["sec-websocket-key"]

    ws.on('message', (message) => {
      console.log('received: %s', message);
    });


    wss.broadcast(`{"connected" :${wss.clients.length}}`)

    ws.on('close', () => {

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
