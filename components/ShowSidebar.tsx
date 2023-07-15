"use client";

import { useAppDispatch } from "@/redux/hook";
import { openSidebar } from "@/redux/slice/SidebarSlice";
import { ChevronRight } from "lucide-react";

export default function ShowSidebar() {
  const dispatch = useAppDispatch();
  return (
    <div className="border border-solid border-PayneGrey p-2 rounded-md cursor-pointer hover:bg-BlackRock transition-colors fixed top-4 left-2 z-5 text-Lavender">
      <ChevronRight size={20} onClick={() => dispatch(openSidebar())} />
    </div>
  );
}
