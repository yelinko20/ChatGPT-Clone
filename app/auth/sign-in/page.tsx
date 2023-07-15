"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center bg-BlackRock">
      <Image
        src={"/chatGPT-White.svg"}
        width={40}
        height={40}
        alt="chat-gpt-logo"
      />
      <div className="text-Lavender">Welcome to ChatGPT</div>
      <div className="text-Lavender font-medium">
        Log in with your Google account to continue
      </div>
      <div className="flex items-center gap-3">
        <button
          className="px-3 py-2 rounded-md text-sm bg-RetroLime text-Lavender hover:bg-RetroLime2 transition-colors"
          onClick={() =>
            signIn("google", {
              callbackUrl: "http://localhost:3000",
            })
          }
        >
          Log in
        </button>
        <button
          className="px-3 py-2 rounded-md text-sm bg-RetroLime text-Lavender hover:bg-RetroLime2 transition-colors"
          onClick={() =>
            signIn("google", {
              callbackUrl: "http://localhost:3000",
            })
          }
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
