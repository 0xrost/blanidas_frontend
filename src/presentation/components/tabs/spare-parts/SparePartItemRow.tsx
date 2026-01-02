import {Badge} from "@/presentation/components/ui/badge.tsx";
import {
    AlertTriangle,
    Building2, Check,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Edit, Trash2,
    Warehouse,
    X,
    XCircle
} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {useMemo, useState} from "react";
import type {MutationOptions} from "@/presentation/models.ts";

interface Props {
    sparePart: SparePart;

    showModal: () => void;
    deleteSparePart: (options?: MutationOptions) => void;

    areLocationVisible: boolean;
    setLocationVisible: (visible: boolean) => void;
}
const SparePartItemRow = ({ sparePart, areLocationVisible, setLocationVisible, showModal, deleteSparePart }: Props) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const quantity = useMemo(() => {
        return sparePart.locations.reduce((quantity, current) => quantity + current.quantity, 0)
    }, [sparePart]);

    const onDeleteSparePart = () => {
        deleteSparePart({
            onSuccess: () => setShowDeleteConfirmation(false),
            onError: () => setShowDeleteConfirmation(true),
        })
    }

    return (
        <>
            <tr
                className={`hover:bg-slate-50 transition-colors ${
                        (quantity < sparePart.minQuantity && quantity > 0) 
                            ? 'bg-yellow-50/30' 
                            : (quantity === 0 ) 
                                ? 'bg-red-50/30' 
                                : ''
                    }`
                }
            >
                <td className="px-4 py-4">
                    <div className="space-y-1">
                        <p className="text-sm text-slate-900">{sparePart.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {sparePart.compatibleModels?.slice(0, 1).map((model, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    <span className="truncate max-w-50">{model.name}</span>
                                </Badge>
                            ))}
                            <Badge variant="secondary" className="text-xs">
                                +{sparePart.compatibleModels.length - 1}
                            </Badge>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4">
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        <span className="truncate max-w-40">{sparePart.category.name}</span>
                    </Badge>
                </td>

                <td className="px-4 py-4">
                    <button
                        onClick={() => setLocationVisible(!areLocationVisible)}
                        className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
                    >
                        <Warehouse className="w-3 h-3" />
                        <span className="truncate max-w-30">
                            {sparePart.locations.length} {
                            sparePart.locations.length === 1
                                ? "склад"
                                : sparePart.locations.length > 1 && sparePart.locations.length < 5
                                    ? "склади"
                                    : "складів"
                        }
                        </span>
                        {areLocationVisible ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                </td>
                <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-45">{sparePart.supplier.name}</span>
                    </div>
                </td>
                <td className="px-4 py-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                            <p className="text-sm text-slate-900">{quantity}</p>
                        </div>
                        <p className="text-xs text-slate-500">мін: {sparePart.minQuantity}</p>
                    </div>
                </td>

                <td className="px-4 py-4 text-center">
                    {quantity >= sparePart.minQuantity && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Є в наявності
                        </Badge>
                    )}
                    {quantity < sparePart.minQuantity && quantity > 0 && (
                        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Мало
                        </Badge>
                    )}
                    {quantity === 0 && (
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Немає
                        </Badge>
                    )}
                </td>

                <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                if (showDeleteConfirmation) {
                                    setShowDeleteConfirmation(false);
                                    return;
                                }
                                showModal();
                            }}
                            className="border-blue-300 text-blue-700 hover:bg-blue-50 h-8 w-8 p-0"
                        >
                            {showDeleteConfirmation ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                if (showDeleteConfirmation) {
                                    onDeleteSparePart();
                                    return;
                                }
                                setShowDeleteConfirmation(true)
                            }}
                            className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        >
                            {showDeleteConfirmation ? <Check className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default SparePartItemRow;