import Link from "next/link"

export const LinkedSection = ({ children, title, href, className }: { children: React.ReactNode, title: string, href: string, className?: string }) => {

    return (
        <div className={`w-full h-full ${className}`}>
            <Link href={href}>
                <div className={`flex pl-4 pr-4 flex-col p-2 hover:bg-card rounded-lg gap-4 w-full h-full ${className}`}>
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">{title}</p>
                        <p className="text-secondary font-semibold text-sm">Show all</p>
                    </div>
                    <div className="w-full h-full pb-2">
                        {children}
                    </div>
                </div>
            </Link>
        </div>
    )
}