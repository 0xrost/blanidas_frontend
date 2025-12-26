import {Header} from "@/presentation/components/layouts/header.tsx";
import {Footer} from "@/presentation/components/layouts/footer.tsx";

type BaseLayoutProps = { children: React.ReactNode; }
const BaseLayout = ({ children }: BaseLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 to-blue-50">
            <Header />
                <main className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    {children}
                </main>
            <Footer />
        </div>
    );
}

export default BaseLayout;