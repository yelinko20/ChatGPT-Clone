import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import AuthProvider from "@/context/AuthProvider";
import { options } from "./api/auth/[...nextauth]/options";
import ToastProvider from "@/context/ToastProvider";
import ReduxProvider from "@/context/ReduxProvider";
import Sidebar from "./sidebar/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatGPT",
  description: "Created By Ye Lin Ko",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/chatGPT-Green.png" />
      </head>
      <body className={`${inter.className} `} suppressHydrationWarning={true}>
        <AuthProvider session={session}>
          <ReduxProvider>
            <ToastProvider />
            <div className="flex">
              <Sidebar />
              <div className="w-full">{children}</div>
            </div>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
