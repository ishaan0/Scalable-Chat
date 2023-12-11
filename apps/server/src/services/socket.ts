import { Redis } from "ioredis";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config({
	path: "./.env",
});

const pub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
});

const sub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
});

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    const io = this.io;
    io.on("connect", (socket) => {
      console.log(`New socket connected, ${socket.id}`);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message recieved", message);
        // io.emit("message", JSON.stringify({ message }));
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        console.log("new message from redis", message);
        io.emit("message", message);
      }
    });
  }
}

export default SocketService;
