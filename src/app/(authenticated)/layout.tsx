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
    const token = session.accessToken;

    return (
        <div className="flex flex-col justify-start items-start transition-height duration-200 ease-in h-dvh w-full max-h-dvh">
            <AuthLayoutContext token={token ? token : ""} header={<Header />}>
                {children}
            </AuthLayoutContext>
        </div>
    );
}

