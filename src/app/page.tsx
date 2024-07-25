import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { SignInButton } from "@/components/SigninButton";
import { redirect } from "next/navigation";
import { getSession } from "@/auth";
import LandingPageText from "@/components/LandingPageText";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/tracks");
  }


  return (
    <main className="flex flex-col 2xl:flex-row max-w-screen-2xl w-full items-center justify-center gap-4">
      <div className="flex lg:p-9 transition-height duration-200 ease-in h-dvh text-nowrap flex-col justify-center items-center gap-4">
        <LandingPageText />
        <SignInButton>CONNECT WITH SPOTIFY</SignInButton>
      </div>
      <div className="w-full p-6">
        <div className="h-auto min-h-[300px] md:min-h-[500px] 2xl:min-h-[800px] lg:p-9 w-full relative overflow-hidden">
          <Image loading="eager" className="object-contain" src="/landingpage.png" alt="avatar" fill />
        </div>
      </div>
    </main>
  );
}

