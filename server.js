var express = require('express');
const http = require('http');
const socketio = require('socket.io'); 
const cors = require('cors');
const moment = require('moment'); 
var path = require('path');
var logger = require('morgan');
require('dotenv').config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//create socket io server 
var server = http.createServer(app);
const io = socketio(server, {
  cors: true, 
  origin: 'https://localhost:3001',
});


io.on("connect", (socket) => {
  console.log(`${socket.id} connected!`);
  //TODO: assign a player and a playerId as they register. 
  // socket.join('game-room');

  socket.on('disconnect', function() {
    console.log(`${socket.id} disconnected!`)
  })
});

// setInterval(()=>{
//   io.to('clock-room').emit('time', new Date())
// },1000)


// view engine setup
if (process.env.NODE_ENV === 'production' || process.env.PREVIEW === 'true'){
  app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'build')));
}

app.use(logger('dev'));
app.use(express.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

// app.listen(port, function() {
// console.log(`Express app running on port ${port}`)
// });

server.listen(port, err=> {
  if(err) console.log(err)
  console.log('Server running on Port', port)
})