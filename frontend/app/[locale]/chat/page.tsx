"use client";

import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "@/components/chatv2/chat";
import { useSession } from "next-auth/react";
import Endpoints from "@/constants/enums/Endpoints";
import { useEffect } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");

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
    const room = `cistoca-123e4567-e89b-12d3-a456-426614174000`;
    socket.emit("join_room", room);
    setRoomId(room);
  };

  useEffect(() => {
    handleJoin();
  }, []);

  return (
    <>
      <ChatPage
        socket={socket}
        roomId={roomId}
        username={session.data?.user.email}
      />
    </>
  );
}
