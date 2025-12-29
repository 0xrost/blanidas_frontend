import BaseLayout from "@/presentation/components/layouts/BaseLayout.tsx";
import NotFoundTab from "@/presentation/components/tabs/not-found/NotFoundTab.tsx";

const NotFoundPage = () => {
    return (
        <BaseLayout>
            <NotFoundTab redirectTo={"/accounts/login"} />
        </BaseLayout>
    );
};

export default NotFoundPage;