export default function Page() {
  return <div></div>;
}
// import FriendRequests from "@/components/chat/FriendRequests";
// import { fetchRedis } from "@/helpers/redis";
// import { authOptions } from "@/app/api/auth/[...nextauth]/options";
// import { getServerSession } from "next-auth";
// import { notFound } from "next/navigation";

// const FriendRequestsPage = async () => {
//   const session = await getServerSession(authOptions);
//   if (!session) notFound();

//   // ids of people who sent current logged in user a friend requests
//   const incomingSenderIds = (await fetchRedis(
//     "smembers",
//     `user:${session.accessToken}:incoming_friend_requests`
//   )) as string[];

//   const incomingFriendRequests = await Promise.all(
//     incomingSenderIds.map(async (senderId) => {
//       const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
//       const senderParsed = JSON.parse(sender) as User;

//       return {
//         senderEmail: senderParsed.email,
//         senderId
//       };
//     })
//   );

//   return (
//     <main className="pt-8">
//       <h1 className="font-bold text-5xl mb-8">Friend requests</h1>
//       <div className="flex flex-col gap-4">
//         <FriendRequests
//           incomingFriendRequests={incomingFriendRequests}
//           sessionId={session.accessToken}
//         />
//       </div>
//     </main>
//   );
// };

// export default FriendRequestsPage;
