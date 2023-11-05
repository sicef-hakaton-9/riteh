import ChatIcon from "@/components/chatv2/chat/chatIcon";
import { Navbar } from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="w-full flex">
        <ChatIcon />
        <Sidebar />
        <div className="max-w-[100%] w:3/4 lg:w-5/6">{children}</div>
      </div>
    </>
  );
}
