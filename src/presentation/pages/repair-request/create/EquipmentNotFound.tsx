import {AlertCircle} from "lucide-react";

const EquipmentNotFound = () => {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center border-4 border-amber-100">
                    <AlertCircle className="w-10 h-10 text-amber-500" />
                </div>
            </div>
            <h2 className="text-center text-slate-900 mb-3">
                Пристрій не знайдено
            </h2>
            <div className="space-y-4 text-center mb-8">
                <p className="text-slate-600">
                    На жаль, пристрій з цим QR-кодом не знайдено в системі Blanidas
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        Це може статися з наступних причин:
                    </p>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left list-disc list-inside">
                        <li>QR-код пошкоджений або нечіткий</li>
                        <li>Помилка при скануванні коду</li>
                        <li>Обладнання ще не зареєстрований в системі</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EquipmentNotFound;