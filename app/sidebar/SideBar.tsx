"use client";

import NewChat from "@/components/NewChat";
import UserProfile from "@/components/UserProfile";
import ChatRow from "@/components/ChatRow";

import { db } from "@/firebase/firebase";
import {
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "@/redux/hook";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const isOpen = useAppSelector((state) => state.sidebar.isOpen);

  const [chats] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  const chatId = uuidv4(); // Generate a UUID
  async function createNewChat() {
    const chatRef = doc(
      collection(db, "users", session?.user?.email as string, "chats"),
      chatId
    ); // Reference to the chat document with the UUID as the document ID

    await setDoc(chatRef, {
      messages: [],
      userId: session?.user?.name,
      createdAt: serverTimestamp(),
    });

    router.push(`/c/${chatId}`);
  }

  const isChatPathname = pathname !== `/c/${chatId}`;

  const isLoginPathname = pathname === `/auth/sign-in`;

  return (
    <div
      className={`${
        isChatPathname && "h-screen fixed lg:sticky top-0 left-0 z-20"
      }`}
    >
      <div
        className={`bg-BlackRussian p-2 text-Quartz h-screen ${
          isOpen ? "w-72 block  " : "w-0  hidden "
        } ${isLoginPathname && "w-0 hidden"} `}
      >
        <NewChat createNewChat={createNewChat} />
        <ChatRow chats={chats} />
        <UserProfile />
      </div>
    </div>
  );
}
