require('babel-polyfill')
const jsdom = require('jsdom');
const prepare = require('mocha-prepare');
const { spawn } = require('child_process');
const path = require('path');
const { JSDOM } = jsdom;
const fetch = require('isomorphic-fetch')

process.env.PORT = 5769
process.env.API_HOST = `http://localhost:${process.env.PORT}/api`;
let server;

// Create jsdom
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
// Make fetch avilable for test env
global.window.fetch = fetch;

// Expose properties from windows directly on global to avoid errors when using things like setTimeout instead of windows.setTimeout
Object.keys(global.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = global.window[property];
  }
});
global.navigator = {userAgent: 'Mocha Test'};

// Spawn a new server on a different port every time we run tests
function startServer (done) {
  server = spawn('node', [path.join(process.cwd(), 'server')], {
    env: Object.assign({ NODE_ENV: 'test', PORT: process.env.PORT }, process.env),
    silent: false,
  })
  server.stdout.on('data', function (data) {
    process.stdout.write(data)
    done();
  })
  server.stderr.on('data', function (error) {
    process.stderr.write(error);
    done();
  })
}

// Kill the test server once tests end
process.on('exit', function () {
  console.log('Shutting down test server');
  server.kill('SIGTERM')
});

// Wait for server to start before running test
prepare(function (done) {
  startServer(done)
})
