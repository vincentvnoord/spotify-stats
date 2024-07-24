"use client";

import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export const TimeFrameButton = ({ children, onClick, timeFrame }: { children: React.ReactNode, onClick?: () => void, timeFrame: string }) => {
    const currentPath = usePathname() + "?timeRange=" + timeFrame;
    const params = useSearchParams();
    const timeRange = params.get("timeRange");
    const selected = timeRange == timeFrame || timeFrame == "short_term" && !timeRange;
    const selectedStyle = "text-background bg-white";
    const defaultStyle = "text-white bg-card hover:bg-secondary";

    console.log(selected, timeRange, timeFrame);

    return (
        <Link href={currentPath}>
            <button onClick={onClick} className={`transition-colors duration-200 text-nowrap ease-in-out min-w-20 md:min-w-28 font-semibold p-3 md:p-3 rounded-full ${selected ? selectedStyle : defaultStyle}`}>
                {children}
            </button>
        </Link>
    )
}