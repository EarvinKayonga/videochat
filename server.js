"use strict";

const cluster = require('cluster'),
      numCPUs = require('os').cpus().length,
      https   = require('https'),
      http    = require('http'),
      fs      = require('fs'),
      wkrImp  = require("./worker/index.js"),

      port    = wkrImp.port,
      app     = wkrImp.app,
      express = require('express'),

      sslOptions = {
        key: fs.readFileSync('ssl/server.key'),
        cert: fs.readFileSync('ssl/server.crt')
      };

/*
  "clustering" my app by running the node server on multiple processing
*/
var stats = {};

if (cluster.isMaster) {
    console.log(' Fork %s worker(s) from master', numCPUs);
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', function(worker) {
        console.log('worker is running on %s pid', worker.process.pid);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker with %s is closed', worker.process.pid)
    })

    console.log("Running on port " + wkrImp.portR);
} else if (cluster.isWorker) {
    stats[cluster.worker.process.pid] = 0
    console.log('worker (%s) is now listening to https://localhost:%s',
        cluster.worker.process.pid, port);


    /*
      Redirects to Https
     */
    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://localhost:3002"});
        res.end();
    }).listen(wkrImp.portR);

    /*
      Setting Up my https server
     */
    let server = https.createServer(sslOptions);
    app.use(express.static(__dirname + '/public'));
    wkrImp.ws(server, function(){
      server.on('request', app);
      server.listen(port);
    });
}



process.on('SIGINT', function() {
    console.log(stats)
    console.log('Execute "$ killall node" to terminate')
    process.exit(0)
})
