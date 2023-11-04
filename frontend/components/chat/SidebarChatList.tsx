// "use client";

// import { pusherClient } from "@/lib/pusher";
// import { chatHrefConstructor, toPusherKey } from "@/lib/utils";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import UnseenChatToast from "./UnseenChatToast";

// interface ExtendedMessage extends Message {
//   senderImg: string;
//   senderName: string;
// }

// const SidebarChatList = ({
//   friends,
//   sessionId
// }: {
//   friends: User[];
//   sessionId: string;
// }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
//   const [activeChats, setActiveChats] = useState<User[]>(friends);

//   useEffect(() => {
//     pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
//     pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

//     const newFriendHandler = (newFriend: User) => {
//       console.log("received new user", newFriend);
//       setActiveChats((prev) => [...prev, newFriend]);
//     };

//     const chatHandler = (message: ExtendedMessage) => {
//       const shouldNotify =
//         pathname !== `/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

//       if (!shouldNotify) return;

//       // should be notified
//       <UnseenChatToast
//         sessionId={sessionId}
//         senderId={message.senderId}
//         senderImg={message.senderImg}
//         senderMessage={message.text}
//         senderName={message.senderName}
//       />;

//       setUnseenMessages((prev) => [...prev, message]);
//     };

//     pusherClient.bind("new_message", chatHandler);
//     pusherClient.bind("new_friend", newFriendHandler);

//     return () => {
//       pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
//       pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

//       pusherClient.unbind("new_message", chatHandler);
//       pusherClient.unbind("new_friend", newFriendHandler);
//     };
//   }, [pathname, sessionId, router]);

//   useEffect(() => {
//     if (pathname?.includes("chat")) {
//       setUnseenMessages((prev) => {
//         return prev.filter((msg) => !pathname.includes(msg.senderId));
//       });
//     }
//   }, [pathname]);

//   return (
//     <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
//       {activeChats.sort().map((friend) => {
//         const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
//           return unseenMsg.senderId === friend.id;
//         }).length;

//         return (
//           <li key={friend.id}>
//             <a
//               href={`/chat-dashboard/chat/${chatHrefConstructor(
//                 sessionId,
//                 friend.id
//               )}`}
//               className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
//             >
//               {friend.name}
//               {unseenMessagesCount > 0 ? (
//                 <div className="bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
//                   {unseenMessagesCount}
//                 </div>
//               ) : null}
//             </a>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default SidebarChatList;