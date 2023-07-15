"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LogOut } from "lucide-react";

export default function UserProfile() {
  const { data: session } = useSession();
  return (
    <div className="h-[7%] relative">
      {session && (
        <div className="hover:bg-BlackRock flex items-center justify-between absolute bottom-0 w-full p-3 rounded-md cursor-pointer">
          <div className="flex gap-2 items-center">
            <Image
              src={session.user?.image!}
              height={30}
              width={30}
              alt="user-profile"
            />
            <div className="text-sm">{session?.user?.name}</div>
          </div>
          <LogOut size={17} onClick={() => signOut()} />
        </div>
      )}
    </div>
  );
}
