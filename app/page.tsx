import PreviewPage from "@/components/ChatPreview";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchChatCompletion } from "@/services/openai";
import ShowSidebar from "@/components/ShowSidebar";

export default async function Page() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/auth/sign-in");
  }
  return (
    <div className="w-full min-h-screen bg-BlackRock relative">
      <PreviewPage />
      <ShowSidebar />
    </div>
  );
}
