const throng = require('throng')
const WORKERS = process.env.WEB_CONCURRENCY || 2
const PORT = process.env.PORT || 8080

throng(WORKERS, start)

function start(workid) {
  console.log('Starting:',workid)
  const crypto = require('crypto')
  const express = require('express')
  const app = express()

  app
    .get('/cpu', cpuBound)
    .get('/memory', memoryBound)
    .get('/io', ioBound)
    .get('/', hello)
    .listen(PORT, onListen)

  function hello(req, res, next) {
    console.log('workid:',workid)
    res.send('Hello, world')
  }

  function cpuBound(req, res, next) {
    console.log('workid:',workid)
    const key = Math.random() < 0.5 ? 'ninjaturtles' : 'powerrangers'
    const hmac = crypto.createHmac('sha512WithRSAEncryption', key)
    const date = Date.now() + ''
    hmac.setEncoding('base64')
    hmac.end(date, () => res.send('A hashed date for you! ' + hmac.read()))
  }

  function memoryBound(req, res, next) {
    console.log('workid:',workid)
    const large = Buffer.alloc(10 * 1024 * 1024, 'X')
    setTimeout(() => {
      const len = large.length  // close over the Buffer for 1s to try to foil V8's optimizations and bloat memory
      console.log(len)
    }, 1000).unref()
    res.send('Allocated 10 MB buffer')
  }

  function ioBound(req, res, next) {
    console.log('workid:',workid)
    setTimeout(function SimulateDb() {
      res.send('Got response from fake db!')
    }, 300).unref()
  }

  function onListen() {
    console.log('Listening on', PORT)
  }
}
