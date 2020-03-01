var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var cont = 0;
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("conectado usuario");
  cont++;
  console.log(cont);
  socket.on("usuario", function (nombre) {
    console.log(nombre);
    // socket.broadcast('usuario', nombre)
    //nombre de usuario por defecto
    socket.on("join_room", room => {
      socket.join(room)
    })

  

    socket.broadcast.emit("usuario", nombre);
    io.emit('cont', cont)
    socket.on("mensaje", function (m) {
      console.log(m);
      io.emit("mensaje", {'m':m, 'nombre':nombre});
    });
  });
  socket.on("disconnect", function () {
    cont--;
    console.log(cont);
    console.log("user disconnected");
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});



//Está escribiendo
//chats privados
//chats grupales
//process.env.PORT para poder ponerlo en produccion
//var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// // use port 3000 unless there exists a preconfigured port
// var port = process.env.port || 3000;

// app.listen(port);