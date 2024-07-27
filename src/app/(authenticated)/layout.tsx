import { getSession } from "@/auth";
import { Header } from "@/components/header/Header";
import { SessionPage } from "@/components/SessionPage";
import { redirect } from "next/navigation";


export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();
    if (!session) {
        redirect("/");
    }

    return (
        <div className="flex justify-center items-center w-full flex-col gap-3">
            <SessionPage>
                    {children}
            </SessionPage>
        </div>
    );
}

