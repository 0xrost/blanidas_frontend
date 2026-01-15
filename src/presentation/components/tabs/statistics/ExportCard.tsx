import {Button} from "@/presentation/components/ui/button.tsx";
import {Calendar, Download} from "lucide-react";
import {Card} from "@/presentation/components/ui/card.tsx";
import {Spinner} from "@/presentation/components/ui/spinner.tsx";

interface Props {
    export_: () => void;
    isLoading: boolean;
}
const ExportCard = ({ export_, isLoading }: Props) => {
    return (
        <Card className="">
            <div className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 border border-black  rounded-xl flex items-center justify-center shadow-sm">
                            <Calendar className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h3 className="text-slate-900">Експорт статистики</h3>
                            <p className="text-sm text-slate-600">Завантажте повний звіт за обраний період</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={export_}
                            disabled={isLoading}
                            className="bg-white border border-black text-black hover:bg-slate-100">
                            {isLoading ? <Spinner className="w-4 h-4" /> : <Download className="w-4 h-4 mr-2" />}
                            {isLoading ? "Завантаження..." : "Експортувати у Excel"}
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
};

export default ExportCard;