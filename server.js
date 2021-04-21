const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const next = require("next");
const nextApp = next({ dev: true });
const nextHandler = nextApp.getRequestHandler();
const connectedUsers = [];

const consoleColors = {
  blue: "\x1b[36m%s\x1b[0m",
  yellow: "\x1b[33m%s\x1b[0m",
  white: "\x1b[47m\x1b[0m",
  cyan: "\x1b[36m%s\x1b[0m",
};

function log(color, ...data) {
  console.log(consoleColors[color], ...data);
}

function showConnectedUsers() {
  log("cyan", "Connected users", connectedUsers);
}

function connectUser(socket) {
  const name = socket.request._query["name"] ?? "A user";
  const sessionID = socket.id;
  connectedUsers.push({ name, sessionID });
  const userConnectedMessage = `${name} has been connected`;
  io.emit("user connected", userConnectedMessage);
  return { name, sessionID };
}

function disconnectUser(sessionID) {
  const userIndex = connectedUsers.findIndex(
    (user) => user.sessionID === sessionID
  );
  log("yellow", `${connectedUsers[userIndex].name} has been disconnected`);
  connectedUsers.splice(userIndex, 1);
}

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(3000, () => {
    console.log("listening on *:3000");
  });

  io.on("connection", (socket) => {
    const { name, sessionID } = connectUser(socket);
    showConnectedUsers();

    socket.on("chat message", (msg) => {
      log("white", "message: " + msg);
      io.emit("chat message", `${name}: ${msg}`);
    });

    socket.on("disconnect", () => {
      disconnectUser(sessionID);
      showConnectedUsers();
    });
  });
});
