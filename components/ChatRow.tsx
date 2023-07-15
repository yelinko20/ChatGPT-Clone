import { DocumentData, QuerySnapshot } from "firebase/firestore";
import ChatHistory from "./ChatHistory";

type ChatRowProps = {
  chats: QuerySnapshot<DocumentData, DocumentData> | undefined;
};

export default function ChatRow({ chats }: ChatRowProps) {
  return (
    <div className="h-[86%] overflow-y-auto">
      {chats?.docs.map((chat) => {
        return <ChatHistory key={chat.id} chatId={chat.id} />;
      })}
    </div>
  );
}
