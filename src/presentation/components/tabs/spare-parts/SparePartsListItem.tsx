import {Badge} from "@/components/ui/badge.tsx";
import {
    AlertTriangle,
    Building2,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Edit, MapPin, Minus, Plus,
    Trash2,
    Warehouse,
    XCircle
} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {useEffect, useRef, useState} from "react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {useInstitutions} from "@/presentation/hooks/institution.ts";
import {UnlimitedPagination} from "@/domain/models/pagination.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {SparePartUpdate} from "@/domain/models/spare-parts.ts";

interface AddLocationForm {
    institution: Institution;
    quantity: number;
}

interface Props {
    sparePart: SparePart;
    updateSparePart: (data: SparePartUpdate) => void;
}
const SparePartsListItem = ({ sparePart, updateSparePart }: Props) => {
    const [localSparePart, setLocalSparePart] = useState<SparePart>(sparePart);
    const quantity = localSparePart.locations.map(x => x.quantity).reduce((quantity, current) => quantity + current, 0)

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [showAddLocationForm, setShowAddLocationForm] = useState<boolean>(false);
    const [addLocationForm, setAddLocationForm] = useState<AddLocationForm | null>(null);

    const stockStatus = "low"

    const { data: institutionsPagination } = useInstitutions(UnlimitedPagination)
    const updateSparePartData = () => ({
        id: sparePart.id,
        locations: localSparePart.locations.map(location => ({
            quantity: location.quantity,
            institutionId: location.institution.id.toString(),
        }))
    });

    const synchronizeWithProps = useRef<boolean>(true);
    useEffect(() => {
        if (synchronizeWithProps.current) {
            synchronizeWithProps.current = false;
            setLocalSparePart(() => sparePart);
        }
    }, [sparePart]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            updateSparePart(updateSparePartData());
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [localSparePart.locations]);

    const changeLocationQuantity = (locationId: string, newQuantity: number) => {
        synchronizeWithProps.current = true;
        setLocalSparePart((prev) => ({
            ...prev,
            locations: prev.locations.map(location => {
                if (location.id !== locationId) return location;
                return { ...location, quantity: newQuantity };
            })
        }))
    };

    const deleteLocation = (locationId: string) => {
        synchronizeWithProps.current = true;
        setLocalSparePart((prev) => ({
            ...prev,
            locations: prev.locations.filter(location => location.id !== locationId)
        }))
    }

    const addLocation = () => {
        synchronizeWithProps.current = true;
        const data = updateSparePartData();
        if (addLocationForm === null) return;
        updateSparePart({
            ...data,
            locations: [
                ...data.locations,
                {
                    quantity: addLocationForm.quantity,
                    institutionId: addLocationForm.institution.id.toString(),
                }
            ]
        });
    }

    return (
        <>
            <tr
                key={sparePart.id}
                className={`hover:bg-slate-50 transition-colors ${
                    stockStatus === 'low' ? 'bg-yellow-50/30' :
                        stockStatus === 'out' ? 'bg-red-50/30' : ''
                }`}
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
                                +{sparePart.compatibleModels.length - 2}
                            </Badge>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        <span className="truncate max-w-40">{sparePart.sparePartCategory.name}</span>
                    </Badge>
                </td>

                <td className="px-4 py-4 hidden lg:table-cell">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
                    >
                        <Warehouse className="w-3 h-3" />
                        <span className="truncate max-w-30">
                            {sparePart.locations.length} {sparePart.locations.length === 1 ? 'склад' : 'складів'}
                        </span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
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

                <td className="px-4 py-4 text-center hidden sm:table-cell">
                    {quantity >= sparePart.minQuantity && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Є в наявності
                        </Badge>
                    )}
                    {quantity <= sparePart.minQuantity && quantity > 0 && (
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
                            className="border-blue-300 text-blue-700 hover:bg-blue-50 h-8 w-8 p-0"
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </td>
            </tr>
            {isExpanded && (
                <tr className="bg-slate-50">
                    <td colSpan={8} className="px-4 py-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-wider text-slate-600">Наявність на складах</p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 text-xs"
                                    disabled={showAddLocationForm}
                                    onClick={() => setShowAddLocationForm(true)}
                                >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Додати склад
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {localSparePart.locations.map((location) => {
                                    return (
                                        <div
                                            key={location.id}
                                            className="flex items-center justify-between py-2 px-3 bg-white border border-slate-200 rounded"
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-slate-900">{location.institution.name}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <p className={`text-sm ${location.quantity > 0 ? 'text-slate-900' : 'text-red-600'}`}>
                                                        <Input
                                                            type="number"
                                                            style={{ width: "auto", minWidth: "2ch" }}
                                                            value={location.quantity}
                                                            onChange={(e) => {changeLocationQuantity(location.id.toString(), +e.target.value)}}
                                                            onInput={(e) => {
                                                                const target = e.target as HTMLInputElement;
                                                                target.style.width = `${Math.max(2, target.value.length) + 0.5}ch`;
                                                            }}
                                                            className="p-0 text-right hide-number-spinner focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 shadow-none h-8 border-slate-300 rounded-md focus:ring-blue-500"
                                                        />
                                                        <span className="ml-1">шт.</span>
                                                    </p>
                                                </div>

                                                <div className="flex gap-1">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={location.quantity === 1}
                                                        className="h-7 w-7 p-0"
                                                        onClick={() => changeLocationQuantity(location.id.toString(), location.quantity - 1)}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-7 w-7 p-0"
                                                        onClick={() => changeLocationQuantity(location.id.toString(), location.quantity + 1)}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {deleteLocation(location.id.toString())}}
                                                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {showAddLocationForm && (
                                    <div className="flex items-center gap-2 py-2 px-3 bg-cyan-50 border border-cyan-200 rounded">
                                        <MapPin className="w-4 h-4 text-cyan-600" />
                                        <Select
                                            onValueChange={(value) => setAddLocationForm({
                                                    ...addLocationForm,
                                                    institution: institutionsPagination?.items.find(x => x.id.toString() === value)
                                                }
                                            )}
                                        >
                                            <SelectTrigger className="flex-1 h-9 bg-white">
                                                <SelectValue placeholder="Оберіть склад" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {institutionsPagination?.items
                                                    .filter(institution =>
                                                        !sparePart.locations.some(location => location.institution.id === institution.id)
                                                    )
                                                    .map(institution => (
                                                        <SelectItem key={institution.id} value={institution.id.toString()}>
                                                            {institution.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            type="number"
                                            value={addLocationForm?.quantity ?? 1}
                                            onChange={(e) => {
                                                if (+e.target.value < 1) return;
                                                setAddLocationForm((prev) => ({...prev, quantity: +e.target.value}));
                                            }}
                                            className="w-28 h-9 bg-white"
                                        />
                                        <Button
                                            size="sm"
                                            disabled={addLocationForm?.institution === undefined}
                                            onClick={() => {if (addLocationForm) addLocation(addLocationForm)}}
                                            className="h-9 px-3 bg-cyan-500 hover:bg-cyan-600 text-white"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-9 px-3"
                                            onClick={() => {
                                                setShowAddLocationForm(false);
                                                setAddLocationForm(null);
                                            }}
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

export default SparePartsListItem;
export type { AddLocationForm };