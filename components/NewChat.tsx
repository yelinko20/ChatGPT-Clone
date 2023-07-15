import { useAppDispatch } from "@/redux/hook";
import { Plus, ChevronLeft } from "lucide-react";
import { closeSidebar } from "@/redux/slice/SidebarSlice";

type NewChatProps = {
  createNewChat: () => Promise<void>;
};

export default function NewChat({ createNewChat }: NewChatProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="h-[7%] flex items-center gap-2">
      <div
        className="flex items-center gap-2 border border-solid border-PayneGrey p-2 rounded-md cursor-pointer hover:bg-BlackRock transition-colors w-[90%]"
        onClick={createNewChat}
      >
        <Plus size={20} />
        <div className="text-sm font-medium">New chat</div>
      </div>
      <div className="border border-solid border-PayneGrey p-2 rounded-md cursor-pointer hover:bg-BlackRock transition-colors">
        <ChevronLeft size={20} onClick={() => dispatch(closeSidebar())} />
      </div>
    </div>
  );
}
