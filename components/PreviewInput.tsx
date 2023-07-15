"use client";

import { FormEvent, useState } from "react";
import { Navigation } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MessageProps } from "@/types";
export default function PreviewInput() {
  const router = useRouter();
  const { data } = useSession();
  const [localQuery, setLocalQuery] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!localQuery) return;
    const chatId = uuidv4(); // Generate a UUID
    const chatRef = doc(
      collection(db, "users", data?.user?.email as string, "chats"),
      chatId
    ); // Reference to the chat document with the UUID as the document ID

    await setDoc(chatRef, {
      messages: [],
      userId: data?.user?.name,
      createdAt: serverTimestamp(),
    });

    const queryText = localQuery.trim();
    setLocalQuery("");
    router.push(`/c/${chatId}`);
    console.log(queryText);

    const message: MessageProps = {
      text: queryText,
      createdAt: serverTimestamp(),
      user: {
        id: data?.user?.name,
        name: data?.user?.name,
        profile:
          data?.user?.image ||
          `https://ui-avatars.com/api/?${data?.user?.name}`,
      },
    };

    await addDoc(
      collection(db, "users", data?.user?.email!, "chats", chatId!, "messages"),
      message
    );

    try {
      await fetch("http://localhost:3000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryText,
          chatId,
          data,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 bg-BlackRock   pt-2 md:pl-2 md:w-[calc(100%-.5rem)]">
      <form
        className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        onSubmit={handleSubmit}
      >
        <div
          className="relative flex h-full flex-1 items-stretch md:flex-col"
          role="presentation"
        >
          <div className="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border text-Lavender border-black/10  rounded-xl shadow-xs dark:shadow-xs">
            <input
              id="prompt-textarea"
              // tabIndex="0"
              data-id="root"
              // rows="1"
              placeholder="Send a message"
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 outline-none focus-visible:ring-0  md:pr-12 pl-3 md:pl-0"
              style={{
                maxHeight: "200px",
                height: "24px",
                overflowY: "hidden",
              }}
              value={localQuery!}
              onChange={handleInputChange}
              disabled={!data}
            />
            <button
              disabled={!data && !localQuery}
              type="submit"
              className={`absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-Lavender bottom-1.5 transition-colors disabled:opacity-40 ${
                localQuery!?.length > 0 && "bg-green-500"
              }`}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4 m-1 md:m-0"
                  strokeWidth="2"
                >
                  <path
                    d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pb-3 pt-2 text-center text-xs text-Lavender md:px-4 md:pb-6 md:pt-3">
        <span>
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts.{" "}
          <a
            href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            ChatGPT May 24 Version
          </a>
        </span>
      </div>
    </div>
  );
}
