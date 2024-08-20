import { TimeFrameButton } from "@/components/ui/Buttons";

export const PageHeader = ({ title }: { title: string }) => {
    return (
        <div className="sticky z-20 bg-background p-3 -left-3 -top-4 flex-col-reverse gap-4 flex md:flex-row items-center justify-between">
            <div className="flex gap-2">
                <TimeFrameButton timeFrame="short_term">latest</TimeFrameButton>
                <TimeFrameButton timeFrame="medium_term">6 months</TimeFrameButton>
                <TimeFrameButton timeFrame="long_term">1 year</TimeFrameButton>
            </div>
            <h1 className="text-primary flex gap-3 text-3xl sm:text-4xl font-extrabold"><p className="text-white">TOP</p>{title}</h1>
        </div>
    )
}