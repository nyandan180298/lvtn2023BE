const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const schedule = require("./middleware/schedule");
const http = require("http");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(cors());

routes(app);
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connect DB Success");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, () => {
  console.log("Server is running in port: ", +port);
});

socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.on("sendDataClient", function (data) {
    socketIo.emit("sendDataServer", { data });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

schedule;
