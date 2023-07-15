import { useAppSelector } from "@/redux/hook";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

type MessageProps = {
  message: DocumentData;
};

export default function Message({ message }: MessageProps) {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);

  const text = message.text;
  const typingSpeed = 20;

  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    let animationTimeout: NodeJS.Timeout | null = null;
    let currentIndex = 0;

    const animateText = () => {
      if (currentIndex < text.length) {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        currentIndex++;
        animationTimeout = setTimeout(animateText, typingSpeed);
      } else {
        setDisplayedText(text); // Animation complete, set displayedText to the full text
      }
    };

    animateText();

    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [text]);

  const isChatGPT = message.user.name === "Chat GPT";
  return (
    <div className={`py-6 ${isChatGPT ? "bg-Comet" : ""}`}>
      <div
        className={`flex items-start px-4 space-x-6 md:max-w-2xl lg:max-w-3xl w-full mx-auto ${
          isOpen ? "md:max-w-lg lg:max-w-2xl" : "md:max-w-2xl lg:max-w-3xl"
        }`}
      >
        <Image
          src={isChatGPT ? "/chatGPT-Green.png" : message.user.profile}
          height={32}
          width={32}
          alt="profile-avatar"
        />
        <p
          id="typing-animation"
          className="text-Lavender text-sm leading-loose"
        >
          {displayedText}
        </p>
      </div>
    </div>
  );
}
