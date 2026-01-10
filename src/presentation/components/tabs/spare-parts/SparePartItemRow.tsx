import {Badge} from "@/presentation/components/ui/badge.tsx";
import {
    AlertTriangle,
    Building2,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Warehouse,
    XCircle
} from "lucide-react";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {clsx} from "clsx";
import {pluralize} from "@/presentation/utils.ts";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {useMemo} from "react";

interface Props {
    sparePart: SparePart;

    showModal: () => void;
    deleteSparePart: (options?: MutationOptions) => void;

    areLocationVisible: boolean;
    setLocationVisible: (visible: boolean) => void;
}
const SparePartItemRow = ({ sparePart, areLocationVisible, setLocationVisible, showModal, deleteSparePart }: Props) => {
    const modelsTitle = useMemo(() => sparePart.compatibleModels.map(x => x.name).join("\n"), [sparePart]);

    return (
        <>
            <tr
                className={clsx(
                    "hover:bg-slate-50 transition-colors",
                    {
                        "bg-yellow-50/30": sparePart.stockStatus === "low_stock",
                        "bg-red-50/30": sparePart.stockStatus === "out_of_stock",
                    }
                )}
            >
                <td className="px-4 py-4">
                    <div className="">
                        <p className="text-sm text-slate-900">{sparePart.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {sparePart.compatibleModels?.slice(0, 1).map((model, index) => (
                                <Badge key={index} title={modelsTitle} variant="secondary" className="text-xs">
                                    <span className="truncate max-w-50">{model.name}</span>
                                </Badge>
                            ))}
                            {sparePart.compatibleModels.length > 1 && (
                                <Badge variant="secondary" className="text-xs">
                                    +{sparePart.compatibleModels.length - 1}
                                </Badge>
                            )}
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4">
                    {sparePart.category && (
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            <span className="truncate max-w-40">{sparePart.category.name}</span>
                        </Badge>
                    )}
                </td>

                <td className="px-4 py-4">
                    <button
                        onClick={() => setLocationVisible(!areLocationVisible)}
                        className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
                    >
                        <Warehouse className="w-3 h-3" />
                        <span className="truncate max-w-30">
                            {sparePart.locations.length} {pluralize(sparePart.locations.length, "склад", "склади", "складів")}
                        </span>
                        {areLocationVisible ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                </td>
                <td className="px-4 py-4">
                    {sparePart.supplier && (
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            <span className="truncate max-w-45">{sparePart.supplier.name}</span>
                        </div>
                    )}
                </td>
                <td className="px-4 py-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                            <p className="text-sm text-slate-900">{sparePart.totalQuantity}</p>
                        </div>
                        <p className="text-xs text-slate-500">мін: {sparePart.minQuantity}</p>
                    </div>
                </td>

                <td className="px-4 py-4 text-center">
                    {sparePart.stockStatus == "in_stock" && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Є в наявності
                        </Badge>
                    )}
                    {sparePart.stockStatus == "low_stock" && (
                        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Мало
                        </Badge>
                    )}
                    {sparePart.stockStatus == "out_of_stock" && (
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Немає
                        </Badge>
                    )}
                </td>

                <td className="px-4 py-4 text-right">
                    <EditDeleteActions edit={showModal} delete_={deleteSparePart} />
                </td>
            </tr>
        </>
    );
};

export default SparePartItemRow;