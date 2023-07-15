import { MessageProps } from "@/types";
import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminServiceDB } from "@/admin/admin";
import { fetchChatCompletion } from "@/services/openai";

export async function POST(req: Request, res: Response) {
  const { query, chatId, data } = await req.json();

  const response = await fetchChatCompletion(query);

  const message: MessageProps = {
    text: response,
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      id: chatId,
      name: "Chat GPT",
    },
  };

  await adminServiceDB
    .collection("users")
    .doc(data?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  return NextResponse.json({ answer: message.text });
}
