import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import TicketUpload from "@/components/ticketUpload";
import { getServerSession } from "next-auth";

export default async function TicketingPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Not authorized</div>;
  }
  return (
    <div className="!w-full flex justify-center items-center">
      <TicketUpload />
    </div>
  );
}
