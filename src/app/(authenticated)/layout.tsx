import { getSession } from "@/auth";
import AuthLayoutContext from "@/components/AuthLayoutContext";
import Header from "@/components/Header";
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
        <div className="flex flex-col justify-start items-start h-full w-full max-h-dvh">
            <AuthLayoutContext header={<Header />}>
                {children}
            </AuthLayoutContext>
        </div>
    );
}

