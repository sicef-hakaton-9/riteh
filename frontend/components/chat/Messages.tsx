// "use client";

// import { pusherClient } from "@/lib/pusher";
// import { useEffect, useRef, useState } from "react";
// import { cn, toPusherKey } from "@/lib/utils";
// import type { Message } from "@/lib/validations/message";

// const Messages = ({
//   chatId,
//   initialMessages,
//   sessionId
// }: {
//   initialMessages: Message[];
//   sessionId: string;
//   chatId: string;
// }) => {
//   const [messages, setMessages] = useState<Message[]>(initialMessages);

//   useEffect(() => {
//     pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

//     const messageHandler = (message: Message) => {
//       setMessages((prev) => [message, ...prev]);
//     };

//     pusherClient.bind("incoming-message", messageHandler);

//     return () => {
//       pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
//       pusherClient.unbind("incoming-message", messageHandler);
//     };
//   }, [chatId]);

//   const scrollDownRef = useRef<HTMLDivElement | null>(null);

//   const formatTimestamp = (timestamp: number) => {
//     //return format(timestamp, "HH:mm");
//     return timestamp;
//   };

//   return (
//     <div
//       id="messages"
//       className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
//     >
//       <div ref={scrollDownRef} />

//       {messages.map((message, index) => {
//         const isCurrentUser = message.senderId === sessionId;

//         const hasNextMessageFromSameUser =
//           messages[index - 1]?.senderId === messages[index].senderId;

//         return (
//           <div className="chat-message" key={`${message.id}-${message.timestamp}`}>
//             <div
//               className={cn("flex items-end", {
//                 "justify-end": isCurrentUser
//               })}
//             >
//               <div
//                 className={cn("flex flex-col space-y-2 text-base max-w-xs mx-2", {
//                   "order-1 items-end": isCurrentUser,
//                   "order-2 items-start": !isCurrentUser
//                 })}
//               >
//                 <span
//                   className={cn("px-4 py-2 rounded-lg inline-block", {
//                     "bg-gray-200 text-gray-900": !isCurrentUser,
//                     "bg-indigo-600 text-white": isCurrentUser,
//                     "rounded-bl-none": !hasNextMessageFromSameUser && !isCurrentUser,
//                     "rounded-br-none": !hasNextMessageFromSameUser && isCurrentUser
//                   })}
//                 >
//                   {message.text}{" "}
//                   <span className="ml-2 text-xs text-gray-400">
//                     {formatTimestamp(message.timestamp)}
//                   </span>
//                 </span>
//               </div>

//               <div
//                 className={cn("relative w-6 h-6", {
//                   invisible: hasNextMessageFromSameUser,
//                   "order-1": !isCurrentUser,
//                   "order-2": isCurrentUser
//                 })}
//               ></div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Messages;
