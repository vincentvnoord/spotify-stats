import { getSession } from "@/auth";
import { Header } from "@/components/header/Header";
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
        <div className="p-6 flex flex-col gap-3">
            <Header />
            <section className="bg-background rounded-lg p-3">
                {children}
            </section>
        </div>
    );
}

