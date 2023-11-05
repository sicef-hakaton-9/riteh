"use client";

import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "@/components/chatv2/chat";
import { useSession } from "next-auth/react";
import Endpoints from "@/constants/enums/Endpoints";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function Chat() {
  const [showChat, setShowChat] = useState(false);
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
    const room = `cistoca-˘${generateUUID()}`;
    socket.emit("join_room", room);
    setRoomId(room);
    setShowChat(true);
  };

  const t = useTranslations();

  const contacts = [
    {
      image: "/images/ri-cistoca.png",
      name: t("sidebar.waste")
    },
    {
      image: "/images/ri-parking.png",
      name: t("sidebar.parking")
    },
    {
      image: "/images/autotrolej.png",
      name: t("sidebar.buses")
    }
  ];

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className="fixed bottom-0 right-0 bg-primary p-4 m-7 z-40 rounded-full cursor-pointer">
            <MessageCircle className="w-5 h-5 z-50" color="white" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex justify-between gap-4">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => handleJoin()}
              >
                <Image
                  src={contact.image}
                  width={80}
                  height={80}
                  alt="contact"
                  className="rounded-lg mb-2"
                />
                {contact.name}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatPage
          socket={socket}
          roomId={roomId}
          username={session.data?.user.email}
        />
      </div>
    </>
  );
}
