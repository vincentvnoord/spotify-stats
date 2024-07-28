import React from "react"
import { Header } from "../header/Header"
import { UserProps } from "../header/User"

export const MainContent = ({ children, user }: { children: React.ReactNode, user: UserProps }) => {

    return (
        <div className="w-full flex h-full max-h-dvh p-6">
            <div className="overflow-scroll overflow-x-hidden h-full flex-col gap-3 max-w-screen-lg bg-background rounded-2xl p-3">
                <Header user={user} />
                {children}
            </div>
        </div>
    )
}