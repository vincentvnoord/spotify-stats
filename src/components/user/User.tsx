"use server";

import { getUserData } from "@/lib/spotify";
import React, { useEffect } from "react";
import UserInfo, { UserProps } from "./UserClient";
import { useSession } from "next-auth/react";
import { getSession } from "@/auth";

export const User = async () => {
    const session = await getSession();
    const user = await getUserData(session?.accessToken as string);

    return (
        <div className="flex bg-card p-2 w-full max-w-screen-lg rounded-xl items-center justify-between">
            <UserInfo {...user} />
        </div>
    )
}