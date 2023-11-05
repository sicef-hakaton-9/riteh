import { getAllTickets } from "@/services/ticket";
import PageClient from "./pageClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function ViewTicketsPage({
  searchParams
}: {
  searchParams: {
    category: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "business") return null;
  const params = {
    category: searchParams.category,
    city: "Rijeka"
  };
  const initialData = await getAllTickets(params);
  return (
    <>
      <PageClient initialData={initialData.allTickets} />
    </>
  );
}
