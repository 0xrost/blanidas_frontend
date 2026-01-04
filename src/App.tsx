import {useAuthSession} from "@/presentation/hooks/auth.ts";
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "@/routeTree.gen.ts";
import {setRefreshToken, setTokenProvider, subscribeOnTokenExpire} from "@/infrastructure/fetch.ts";
import {AuthService} from "@/dependencies.ts";

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    context: { authSession: null }
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

setTokenProvider(() => AuthService.getSession()?.token.accessToken ?? null)
setRefreshToken(() =>  AuthService.refresh());

subscribeOnTokenExpire(() => {
    AuthService.logout();
    void router.navigate({to: "/accounts/login"});
});

const App = () => {
    const authSession = useAuthSession();
    return <RouterProvider router={router} context={{ authSession }} />;
}

export default App;