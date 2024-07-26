import React from "react"
import { Header } from "../header/Header"

export const MainContent = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="w-full flex flex-col gap-3 max-w-screen-lg bg-background rounded-2xl p-3">
            <Header />
            {children}
        </div>
    )
}