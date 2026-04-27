import {Badge} from "@/presentation/components/ui/badge.tsx";
import {
    ChevronDown,
    ChevronUp,
    Warehouse,
} from "lucide-react";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {pluralize} from "@/presentation/utils.ts";
import EditDeleteActions from "@/presentation/components/layouts/EditDeleteActions.tsx";
import {useMemo} from "react";
import StatusIcon from "@/presentation/components/layouts/StatusIcon.tsx";

interface Props {
    sparePart: SparePart;

    showModal: () => void;
    deleteSparePart: (options?: MutationOptions) => void;

    areLocationVisible: boolean;
    setLocationVisible: (visible: boolean) => void;
}
const SparePartItemRow = ({ sparePart, areLocationVisible, setLocationVisible, showModal, deleteSparePart }: Props) => {
    const modelsTitle = useMemo(() => sparePart.compatibleModels.map(x => x.name).join("\n"), [sparePart]);
    const restoredQuantity = useMemo(() => 
        sparePart.locations.reduce((acc, x) => acc + x.restoredQuantity, 0),
      [sparePart])

    return (
        <div
            className="
                px-4 py-3 items-center hover:bg-slate-50 transition-colors grid
                grid-cols-[minmax(0,5fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]
                lg:grid-cols-[minmax(0,3fr)_minmax(0,1.5fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,0.4fr)] gap-4
            "
        >
            <div className="min-w-0">
                <div className="flex items-center min-w-0">
                    <StatusIcon
                        status={sparePart.stockStatus}
                        statusToStyleMap={{
                            in_stock: "green",
                            low_stock: "yellow",
                            out_of_stock: "red",
                        }}
                    />
                    <p className="text-sm font-medium text-slate-900 truncate" title={sparePart.name}>
                        {sparePart.name}
                    </p>
                </div>

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

            <div className="min-w-0">
                <button
                    onClick={() => setLocationVisible(!areLocationVisible)}
                    className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 transition-colors min-w-0"
                >
                    <Warehouse className="w-4 h-4 text-slate-300 shrink-0" />
                    <span className="truncate" title={`${sparePart.locations.length}`}>
                        {sparePart.locations.length} {pluralize(sparePart.locations.length, "склад", "склади", "складів")}
                    </span>
                    {areLocationVisible ? (
                        <ChevronUp className="w-4 h-4 shrink-0" />
                    ) : (
                        <ChevronDown className="w-4 h-4 shrink-0" />
                    )}
                </button>
            </div>

            <div className="hidden lg:block min-w-0 text-left">
                <span className="text-sm text-purple-800 font-medium text-wrap block" title={sparePart.category?.name ?? ""}>
                    {sparePart.category?.name ?? "—"}
                </span>
            </div>

            <div className="text-center">
                <p className="text-sm font-medium text-slate-900">{sparePart.totalQuantity} (мін: {sparePart.minQuantity})</p>
                <p className="text-xs text-slate-500">з них відновлені {restoredQuantity}</p>
            </div>

            <div className="flex items-center justify-end">
                <EditDeleteActions edit={showModal} delete_={deleteSparePart} />
            </div>
        </div>
    );
};

export default SparePartItemRow;