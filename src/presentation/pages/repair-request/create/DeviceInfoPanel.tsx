import {Card} from "@/presentation/components/ui/card.tsx";
import {Hash, MapPin, Monitor} from "lucide-react";
import type {Equipment} from "@/domain/entities/equipment.ts";


type DeviceInfoPanelProps = { equipment: Equipment | null, isLoading: boolean };
const DeviceInfoPanel = ({ equipment, isLoading }: DeviceInfoPanelProps) => {
    return (
        <Card className="py-6 bg-white border-slate-200 shadow-sm">
            <div className="px-6">
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <Monitor className="w-5 h-5 text-slate-400 mt-3" />
                        <div>
                            <p className="text-sm text-slate-500">Модель обладнання</p>
                            {isLoading
                                ? <div className="h-4 w-52 bg-slate-200 rounded animate-pulse"></div>
                                : <p className="text-slate-900 text-base">{equipment?.model?.name}</p>
                            }
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Hash className="w-5 h-5 text-slate-400 mt-3" />
                        <div>
                            <p className="text-sm text-slate-500">Серійний номер</p>
                            {isLoading
                                ? <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
                                : <p className="text-slate-900">{equipment?.serialNumber}</p>
                            }
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-slate-400 mt-3" />
                        <div>
                            <p className="text-sm text-slate-500">Розташування</p>
                            {isLoading
                                ? <div className="h-4 w-65 bg-slate-200 rounded animate-pulse"></div>
                                : <p className="text-slate-900">{equipment?.location}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default DeviceInfoPanel;