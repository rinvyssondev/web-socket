var express = require("express");
const { Socket } = require("socket.io");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("O usuário desconectou: " + socket.id);
  });

  socket.on("msg", (data) => {
    io.emit("showmsg", data); // Direto do servidor para todo mundo
    //socket.broadcast.emit('showmsg', data) --> Emite para todo mundo, menos para si mesmo.
    console.log(data);
  });
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

http.listen(3000, () => {
  console.log("app rodando!");
});
