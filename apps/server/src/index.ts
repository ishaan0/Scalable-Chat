import http from "http";
import SocketService from "./services/socket";


async function init() {
  const socketService = new SocketService();

  const httpServer = http.createServer();
  const port = process.env.PORT || 8000;

  socketService.io.attach(httpServer);

  httpServer.listen(port, () => console.log(`Http server started at ${port}`));

  socketService.initListeners();
}

init();
