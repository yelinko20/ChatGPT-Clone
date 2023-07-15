import { db } from "@/firebase/firebase";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { MessageSquare, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";

export default function ChatHistory({ chatId }: { chatId: string }) {
  const { data } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const active = pathname === `/c/${chatId}` && "bg-BlackRock";

  const [messages] = useCollection(
    collection(db, "users", data?.user?.email!, "chats", chatId, "messages")
  );

  async function DeleteChat() {
    await deleteDoc(doc(db, "users", data?.user?.email!, "chats", chatId));
    router.replace("/");
  }

  return (
    <Link
      href={`/c/${chatId}`}
      className={`flex items-center justify-between gap-2 p-3 rounded-md ${active}`}
    >
      <MessageSquare
        size={18}
        className="text-Lavender opacity-70 hover:opacity-100"
      />
      <p className="text-sm truncate flex-1">
        {messages?.docs[messages.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <Trash2
        size={18}
        className="text-Lavender opacity-70 hover:opacity-100"
        onClick={DeleteChat}
      />
    </Link>
  );
}
