import { getSession } from "@/auth";
import AuthLayoutContext from "@/components/AuthLayoutContext";
import Menu from "@/components/menu/Menu";
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
        <div className="flex justify-center items-center w-full">
            <AuthLayoutContext menu={<Menu />}>
                {children}
            </AuthLayoutContext>
        </div>
    );
}

