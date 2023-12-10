import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    const io = this.io;
    io.on("connect", (socket) => {
      console.log(`New socket connected, ${socket.id}`);

      socket.on("even:message", ({ message }: { message: string }) => {
        console.log("New message recieved", message);
      });
    });
  }
}

export default SocketService;
