"use client";
import React, { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IMsgDataTypes {
  roomId: string | number;
  user: string;
  msg: string;
  time: string;
}

const ChatPage = ({
  roomId,
  socket,
  username
}: {
  roomId: string | number;
  socket: Socket;
  username: string;
}) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([
    { msg: "hello", roomId: 123, time: "12:00", user: "ivor" },
    { msg: "hello", roomId: 123, time: "12:00", user: "asd" }
  ]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        msg: currentMsg,
        roomId,
        time:
          new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        user: username
      };
      socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  return (
    <div className="h-screen w-screen flex">
      <div className="border-r-2 md:w-[350px] md:block hidden">
        <p className="top-0 h-[52px] w-full flex items-center px-4 shadow-md">
          Chats
        </p>
      </div>
      <div className="h-full w-full">
        <div className="px-8 top-0 h-[52px] w-full flex items-center shadow-md">
          <p>
            <b>{username}</b> - Room Id: <b>{roomId}</b>
          </p>
        </div>
        <ScrollArea className="h-[calc(100%-118px)] flex flex-col-reverse px-4">
          {chat.map(({ msg, user }, key) => (
            <div
              key={key}
              className={
                "flex items-center gap-2 mb-5" +
                (user === username ? " flex-row-reverse" : "")
              }
              // className={
              // user === username ? style.chatProfileRight : style.chatProfileLeft
              // }
            >
              <span
                className="bg-slate-600 w-[24px] h-[24px] rounded-full flex items-center justify-center text-white"
                style={{ textAlign: user === username ? "right" : "left" }}
              >
                {user.charAt(0)}
              </span>
              <h3
                className="bg-slate-400 rounded-full px-2 py-1 text-white"
                style={{ textAlign: user === username ? "right" : "left" }}
              >
                {msg}
              </h3>
            </div>
          ))}
        </ScrollArea>
        <div className="px-6 bottom-0 w-full border-t-2 h-[64px] flex items-center">
          <form
            onSubmit={async (e) => sendData(e)}
            className="flex w-full gap-4 items-center"
          >
            <Input
              type="text"
              value={currentMsg}
              placeholder="Type your message.."
              onChange={(e) => setCurrentMsg(e.target.value)}
              className="w-full"
            />
            <Button className="w-[80px]">Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;