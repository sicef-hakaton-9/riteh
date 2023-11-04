"use client";

import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "@/components/chatv2/chat";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Endpoints from "@/constants/enums/Endpoints";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [roomId, setroomId] = useState("");

  const session = useSession();
  const token = session?.data?.accessToken;

  const socket = io(
    "http://albbackend-329756656.eu-central-1.elb.amazonaws.com" + Endpoints.CHAT,
    {
      query: {
        token
      }
    }
  );

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      // console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowChat(true);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div
        className={
          "w-[400px] flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-md"
        }
        style={{ display: showChat ? "none" : "" }}
      >
        <h1>Enter your info</h1>
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="room id"
          onChange={(e) => setroomId(e.target.value)}
        />
        <Button className="w-full mt-4" onClick={() => handleJoin()}>
          Join
        </Button>
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatPage socket={socket} roomId={roomId} username={userName} />
      </div>
    </div>
  );
}
