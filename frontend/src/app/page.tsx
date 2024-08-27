/* eslint-disable @next/next/no-img-element */
import LoginComponent from "@/components/Login";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full h-screen gap-2">
      <div className="w-1/2 flex justify-center items-center">
        <LoginComponent />
      </div>
      <div className="w-1/2 bg-primary flex items-center justify-center">
        <img src="/icons/privacy.png" alt="Initial page login image" />
      </div>
    </div>
  );
}
