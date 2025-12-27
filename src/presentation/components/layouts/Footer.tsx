import { Mail, Phone } from "lucide-react";


const Footer = () => {
    return (
        <footer className="mt-auto bg-white border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-600">
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>+380 44 123 4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:support@blanidas.com" className="hover:text-cyan-600 transition-colors">
                            support@blanidas.com
                        </a>
                    </div>
                </div>
                <p className="text-center text-sm text-slate-500 mt-4">
                    © 2025 Blanidas. Сервіс медичного обладнання
                </p>
            </div>
        </footer>
    )
}

const DashboardFooter = () => {
    return (
        <footer className="mt-16 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-600">
                    <span>© 2025 Blanidas</span>
                    <span>|</span>
                    <a href="mailto:support@blanidas.com" className="hover:text-cyan-600 transition-colors">
                        Технічна підтримка
                    </a>
                </div>
            </div>
        </footer>
    )
}

export { Footer, DashboardFooter };