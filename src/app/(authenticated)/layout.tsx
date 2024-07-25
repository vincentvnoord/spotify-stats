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
        <div className="p-6 max-w-screen-lg flex w-full flex-col gap-3">
            <Header />
            <SessionPage>
                <section className="bg-background w-full rounded-lg md:p-3">
                    {children}
                </section>
            </SessionPage>
        </div>
    );
}

