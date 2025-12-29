import type {AuthSession} from "@/domain/auth/session.ts";
import type {UserLogin} from "@/domain/repositories/auth.ts";

type Listener = (value: AuthSession | null) => void

class AuthService {
    private session: AuthSession | null = null
    private listeners = new Set<Listener>()
    private readonly login_callback: (command: LoginCommand) => Promise<AuthSession>

    constructor(login_callback: (command: LoginCommand) => Promise<AuthSession>) {
        this.login_callback = login_callback;
    }

    async login(email: string, password: string) {
        this.session = await this.login_callback({ email, password });
        this.emit()
        return this.session
    }

    logout() {
        this.session = null
        this.emit()
    }

    getSession() {
        return this.session
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }

    unsubscribe(listener: Listener) {
        this.listeners.delete(listener)
        return () => this.listeners.delete(listener)
    }

    private emit() {
        this.listeners.forEach(l => l(this.session))
    }
}

export { AuthService };