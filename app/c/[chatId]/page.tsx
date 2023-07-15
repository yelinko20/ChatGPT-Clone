"use client";

import ChatInput from "@/components/ChatInput";
import PreviewPage from "@/components/ChatPreview";
import Message from "@/components/Message";
import PreviewTexts from "@/components/PreviewTexts";
import ShowSidebar from "@/components/ShowSidebar";
import { db } from "@/firebase/firebase";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { openSidebar } from "@/redux/slice/SidebarSlice";
import { collection, orderBy, query } from "firebase/firestore";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";

export default function ChatConversation() {
  const { data } = useSession();
  const { chatId } = useParams();

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);

  const [messages] = useCollection(
    data &&
      query(
        collection(db, "users", data.user?.email!, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex flex-col bg-BlackRock min-h-screen relative">
      {messages?.docs.length! > 0 ? (
        <div className=" overflow-y-auto py-2 mb-60">
          {messages?.docs.map((message) => {
            return <Message key={message.id} message={message.data()} />;
          })}
        </div>
      ) : (
        <div className="w-full mx-auto md:max-w-2xl lg:max-w-3xl  md:flex md:flex-col px-6  relative">
          <PreviewTexts />
        </div>
      )}
      <div
        className={`fixed  bg-BlackRock bottom-0 right-0 z-10 ${
          isOpen ? " left-[19%]" : "left-0"
        }`}
      >
        <ChatInput chatId={chatId} />
      </div>
      <ShowSidebar />
    </div>
  );
}
