import React from "react"

export const MainContent = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="w-full flex h-full xl:pl-2 xl:pt-6 xl:pb-6">
            <div className="overflow-scroll overflow-x-hidden w-full h-full flex-col gap-3 bg-background xl:rounded-lg p-3">
                {children}
            </div>
        </div>
    )
}

