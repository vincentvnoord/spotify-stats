import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { SignInButton } from "@/components/SigninButton";
import { redirect } from "next/navigation";
import { getSession } from "@/auth";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/tracks");
  }


  return (
    <main className="flex min-h-screen w-full items-center justify-center p-9">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-extrabold">Get insights into your favorite music</h1>
        <SignInButton>CONNECT WITH SPOTIFY</SignInButton>
      </div>
      <div className="min-h-[550px] min-w-[300px] relative overflow-hidden">
        <Image className="object-contain" src="/woman.jpg" alt="avatar" fill />
      </div>
    </main>
  );
}

