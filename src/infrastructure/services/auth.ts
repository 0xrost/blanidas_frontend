import type { AuthSession } from "@/domain/auth/session";
import type {UserLogin} from "@/domain/models/auth.ts";

type Listener = (value: AuthSession | null) => void;

const STORAGE_KEY = "auth-session";

class AuthService {
    private authSession: AuthSession | null = null;
    private listeners = new Set<Listener>();
    private readonly loginCallback: (command: UserLogin) => Promise<AuthSession>;

    constructor(loginCallback: (command: UserLogin) => Promise<AuthSession>) {
        this.loginCallback = loginCallback;
        this.loadFromStorage();
        this.syncBetweenTabs();
    }

    private loadFromStorage() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            this.authSession = raw ? JSON.parse(raw) : null;
        } catch {
            localStorage.removeItem(STORAGE_KEY);
            this.authSession = null;
        }
    }

    async login(email: string, password: string) {
        this.authSession = await this.loginCallback({ email, password });
        this.persist();
        this.notify();
        return this.authSession;
    }

    logout() {
        this.authSession = null;
        localStorage.removeItem(STORAGE_KEY);
        this.notify();
    }

    getSession() {
        return this.authSession;
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        listener(this.authSession);
        return () => this.listeners.delete(listener);
    }

    private notify() {
        this.listeners.forEach(l => l(this.authSession));
    }

    private persist() {
        if (this.authSession) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.authSession));
        }
    }

    private syncBetweenTabs() {
        window.addEventListener("storage", (e) => {
            if (e.key !== STORAGE_KEY) return;

            this.authSession = e.newValue ? JSON.parse(e.newValue) : null;
            this.notify();
        });
    }
}

export { AuthService };
