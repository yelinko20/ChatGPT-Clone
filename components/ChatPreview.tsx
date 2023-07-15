"use client";

import { useAppSelector } from "@/redux/hook";
import PreviewInput from "./PreviewInput";
import PreviewTexts from "./PreviewTexts";

export default function PreviewPage() {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  return (
    <>
      <div className="w-full mx-auto md:max-w-2xl lg:max-w-3xl  md:flex md:flex-col px-6  relativ bg-BlackRock">
        <PreviewTexts />
      </div>
      <div
        className={`fixed  bg-BlackRock bottom-0 right-0 z-10 ${
          isOpen ? " left-[19%]" : "left-0"
        }`}
      >
        <PreviewInput />
      </div>
    </>
  );
}
