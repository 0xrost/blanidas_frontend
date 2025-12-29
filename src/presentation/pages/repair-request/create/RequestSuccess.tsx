import {CheckCircle2, FileText} from "lucide-react";
import {formatNumber} from "@/utils.ts";

const RequestSuccess = ({ repairRequestId }: { repairRequestId: string }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12">
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-linear-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
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
            <div className="text-center space-y-4">
                <p className="text-slate-700">
                    Дякуємо за звернення! Ваша заявка прийнята в обробку
                </p>
                <p className="text-slate-600">
                    Наш сервісний інженер зв'яжеться з адміністрацією для уточнення деталей та узгодження часу ремонту
                </p>
            </div>
        </div>
    )
};

export default RequestSuccess;