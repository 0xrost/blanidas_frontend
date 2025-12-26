import {CheckCircle2, FileText} from "lucide-react";
import {formatNumber} from "@/utils.ts";

const RequestSuccess = ({ repairRequestId }: { repairRequestId: string }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12">
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-lineral-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
                </div>
            </div>
            <h2 className="text-center text-slate-900 mb-3">
                Заявку успішно створено!
            </h2>
            <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-900">Номер заявки:</span>
                    <span className="text-blue-700">{formatNumber(repairRequestId, 8)}</span>
                </div>
            </div>
            <div className="text-center space-y-4 mb-8">
                <p className="text-slate-700">
                    Дякуємо за звернення! Ваша заявка прийнята в обробку.
                </p>
                <p className="text-slate-600">
                    Наш сервісний інженер зв'яжеться з вами найближчим часом для уточнення деталей та узгодження часу ремонту.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4">
                    <h3 className="text-cyan-900 mb-2">Що далі?</h3>
                    <ul className="text-sm text-cyan-800 space-y-1.5">
                        <li>✓ Інженер переглянув заявку</li>
                        <li>✓ Вам зателефонують протягом години</li>
                        <li>✓ Буде призначено час візиту</li>
                    </ul>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <h3 className="text-green-900 mb-2">Важлива інформація</h3>
                    <ul className="text-sm text-green-800 space-y-1.5">
                        <li>📧 Деталі надіслано на email</li>
                        <li>📱 SMS підтвердження надіслано</li>
                        <li>⏱ Середній час реагування: 30 хв</li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-center text-sm text-slate-600 mb-3">
                    Маєте питання? Зв'яжіться з нами:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                    <a
                        href="tel:+380441234567"
                        className="text-cyan-600 hover:text-cyan-700 transition-colors flex items-center gap-1"
                    >
                        📞 +380 44 123 4567
                    </a>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <a
                        href="mailto:support@blanidas.com"
                        className="text-cyan-600 hover:text-cyan-700 transition-colors flex items-center gap-1"
                    >
                        ✉️ support@blanidas.com
                    </a>
                </div>
            </div>
        </div>
    )
};

export default RequestSuccess;