import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth-options";
import AuthProvider from "./api/auth/[...nextauth]/auth-provider";
import Header from "@/components/Header";
import RedirectOnLogin from "@/components/Redirect";
import { ModalProvider } from "@/contexts/ModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ComigoTech",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`flex min-h-screen flex-col bg-[#f1f5f9] ${inter.className}`}
      >
        <AuthProvider session={session}>
          <ModalProvider>
            <Toaster position="top-center" />
            <NextTopLoader color="#fff" speed={200} />

            <RedirectOnLogin>
              <Header />
              <div className="mx-6">{children}</div>
            </RedirectOnLogin>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
