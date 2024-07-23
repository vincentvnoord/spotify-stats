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
    <main className="flex min-h-screen w-full items-center justify-center p-9 gap-4">
      <div className="flex min-w-[800px] flex-col justify-center items-center gap-4 p-9">
        <LandingPageText />
        <SignInButton>CONNECT WITH SPOTIFY</SignInButton>
      </div>
      <div className="min-h-[800px] w-full relative overflow-hidden">
        <Image className="object-contain" src="/landingpage.png" alt="avatar" fill />
      </div>
    </main>
  );
}

