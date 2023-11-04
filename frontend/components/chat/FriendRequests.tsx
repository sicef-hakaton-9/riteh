// "use client";

// import { useEffect, useState } from "react";
// import { Check, UserPlus, X } from "lucide-react";
// import { useRouter } from "next/navigation";

// const FriendRequests = ({
//   incomingFriendRequests,
//   sessionId
// }: {
//   incomingFriendRequests: IncomingFriendRequest[];
//   sessionId: string;
// }) => {
//   const router = useRouter();
//   const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
//     incomingFriendRequests
//   );

//   useEffect(() => {
//     console.log("listening to ", `user:${sessionId}:incoming_friend_requests`);
//   }, [sessionId]);

//   const acceptFriend = async (senderId: string) => {
//     setFriendRequests((prev) =>
//       prev.filter((request) => request.senderId !== senderId)
//     );

//     router.refresh();
//   };

//   const denyFriend = async (senderId: string) => {
//     setFriendRequests((prev) =>
//       prev.filter((request) => request.senderId !== senderId)
//     );

//     router.refresh();
//   };

//   return (
//     <>
//       {friendRequests.length === 0 ? (
//         <p className="text-sm text-zinc-500">Nothing to show here...</p>
//       ) : (
//         friendRequests.map((request) => (
//           <div key={request.senderId} className="flex gap-4 items-center">
//             <UserPlus className="text-black" />
//             <p className="font-medium text-lg">{request.senderEmail}</p>
//             <button
//               onClick={async () => {
//                 await acceptFriend(request.senderId);
//               }}
//               aria-label="accept friend"
//               className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
//             >
//               <Check className="font-semibold text-white w-3/4 h-3/4" />
//             </button>

//             <button
//               onClick={async () => {
//                 await denyFriend(request.senderId);
//               }}
//               aria-label="deny friend"
//               className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
//             >
//               <X className="font-semibold text-white w-3/4 h-3/4" />
//             </button>
//           </div>
//         ))
//       )}
//     </>
//   );
// };

// export default FriendRequests;
