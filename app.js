const express = require('express');
const app = express();
const path = require("path");

const http = require("http");

const socketio = require("socket.io");

const server =  http.createServer(app);
const io = socketio(server);


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test-css', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/css/stylesheet.css'));
});

// io.on("connection", function(socket){

//     socket.on("send-location",function(data) {
//         io.emit("receive-location", {id: socket.id, ...data});
//     });
//     console.log("Connected" +socket.id);

//     socket.on("disconnect", function() {
//         io.emit("user-disconnected", socket.id);
//     });
// });

let markerCount = 0;

io.on("connection", function(socket){
    socket.on("send-location", function(data) {
        markerCount += 1;
        io.emit("receive-location", {
            id: socket.id,
            ...data,
            number: markerCount
        });
    });

    console.log("Connected " + socket.id);

    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
    });
});




app.get("/", function (req,res){
    res.render("index");
    // res.send("/views/index.ejs")
});

server.listen(3000);