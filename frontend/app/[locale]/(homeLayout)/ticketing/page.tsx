import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import TicketUpload from "@/components/ticketUpload";
import { getServerSession } from "next-auth";

export default function TicketingPage() {
  const session = getServerSession(authOptions);

  if (!session) {
    return <div>Not authorized</div>;
  }
  return (
    <div className="!w-full flex justify-center items-center">
      <TicketUpload />
    </div>
  );
}
