"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className={classes["container"]}>
      <div>
        <div>
          <input
            onChange={(e) => setMessage(e.target.value)}
            className={classes["chat-input"]}
            placeholder="Message..."
            value={message}
          />
          <button onClick={handleSendMessage} className={classes["button"]}>
            Send
          </button>
        </div>
        <div className={classes["chat-list"]}>
          {messages.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </div>
      </div>
    </div>
  );
}
