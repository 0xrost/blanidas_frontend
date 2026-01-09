import BaseLayout from "@/presentation/components/layouts/BaseLayout.tsx";
import NotFoundTab from "@/presentation/components/tabs/not-found/NotFoundTab.tsx";

type Scope = "dashboard" | "default";
interface Props { scope: Scope }
const NotFoundPage = ({ scope }: Props) => {
    return (
        <BaseLayout>
            <NotFoundTab redirectTo={scope === "dashboard" ? "/accounts/login/" : undefined} />
        </BaseLayout>
    );
};

export default NotFoundPage;