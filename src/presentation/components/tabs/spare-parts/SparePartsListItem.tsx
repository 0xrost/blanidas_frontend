import {Badge} from "@/components/ui/badge.tsx";
import {
    AlertTriangle,
    Building2,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Edit, MapPin, Minus, Plus, Save,
    Trash2,
    Warehouse,
    XCircle
} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {useEffect, useMemo, useState} from "react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {useInstitutions} from "@/presentation/hooks/institution.ts";
import {UnlimitedPagination} from "@/domain/models/pagination.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {LocationCreate} from "@/domain/models/spare-parts.ts";

interface UILocation {
    institution: Institution;
    quantity: number;
}

interface Props {
    sparePart: SparePart;
    updateLocations: (sparePartId: string, locations: LocationCreate[]) => void;
}

const SparePartsListItem = ({ sparePart, updateLocations }: Props) => {
    const { data: institutionsPagination } = useInstitutions(UnlimitedPagination)
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const locationFormInitialValue = { institution: null!, quantity: 1 };
    const [locationForm, setLocationForm] = useState<UILocation>(locationFormInitialValue);
    const [locations, setLocations] = useState<UILocation[]>([]);

    useEffect(() => {
        setLocations(sparePart.locations.map(location => ({
            quantity: location.quantity,
            institution: location.institution,
        })))
    }, [sparePart.locations])

    const quantity = useMemo(() => {
        return locations
            .map((x) => x.quantity)
            .reduce((quantity, current) => quantity + current, 0)
    }, [locations]);

    const availableInstitutions = useMemo(() => {
        if (institutionsPagination === undefined) return [];
        return institutionsPagination.items.filter(institution =>
            !locations.some(location => location.institution.id === institution.id)
        )
    }, [institutionsPagination, locations]);

    const saveChanges = () => {
        updateLocations(sparePart.id, locations.map(location => ({
            quantity: location.quantity,
            institutionId: location.institution.id,
        })));
    };

    const changeQuantity = (institutionId: string, newQuantity: number) => {
        setLocations((prev) =>
            prev.map((location) => {
                if (location.institution.id !== institutionId) return location;
                return {
                    ...location,
                    quantity: newQuantity
                };
            }
        ));
    };

    console.log(locations)

    const deleteLocation = (institutionId: string) => {
        setLocations(
            (prev) =>
                prev.filter((location) => location.institution.id !== institutionId)
        );
    }

    const addLocation = () => {
        setLocations((prev) => [
            ...prev,
            {
                ...locationForm,
                isNew: true
            }
        ])
    }

    return (
        <>
            <tr
                key={sparePart.id}
                className={`hover:bg-slate-50 transition-colors ${
                        quantity < sparePart.minQuantity && quantity > 0 ? 'bg-yellow-50/30' :
                        quantity === 0 ? 'bg-red-50/30' : ''
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
                            {locations.length} {
                                locations.length === 1
                                        ? "склад"
                                    : locations.length > 1 && locations.length < 5
                                        ? "склади"
                                    : "складів"
                            }
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
                    <td colSpan={7} className="px-4 py-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-wider text-slate-600">Наявність на складах</p>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 text-xs"
                                        onClick={saveChanges}
                                        disabled={
                                            locations.length === sparePart.locations.length &&
                                            !locations.some(
                                                location => !sparePart.locations.some(
                                                    loc =>
                                                        loc.quantity === location.quantity &&
                                                        loc.institution.id === location.institution.id
                                                )
                                            )
                                        }
                                    >
                                        <Save className="w-3 h-3 mr-1" />
                                        Зберегти зміни
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {locations.map((location) => {
                                    return (
                                        <div
                                            key={location.institution.id}
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
                                                            onChange={(e) => {changeQuantity(location.institution.id, +e.target.value)}}
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
                                                        onClick={() => changeQuantity(location.institution.id, location.quantity - 1)}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-7 w-7 p-0"
                                                        onClick={() => changeQuantity(location.institution.id, location.quantity + 1)}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {deleteLocation(location.institution.id)}}
                                                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {locations.length === 0 &&
                                    <div className="flex flex-col items-center justify-center py-6 text-center bg-white border border-dashed border-slate-300 rounded">
                                        <Warehouse className="w-8 h-8 text-slate-400 mb-2" />
                                        <p className="text-sm text-slate-700">
                                            Запчастина не має складів
                                        </p>
                                        <p className="text-xs text-slate-500 mb-3">
                                            Додайте склад, щоб керувати залишками
                                        </p>
                                    </div>
                                }
                                <div className="flex items-center gap-2 py-2 px-3 bg-cyan-50 border border-cyan-200 rounded">
                                    <MapPin className="w-4 h-4 text-cyan-600" />
                                    <Select
                                        value={(locationForm.institution) ? locationForm.institution.id : ''}
                                        onValueChange={value => {
                                            setLocationForm(prev => ({
                                                ...prev,
                                                institution: availableInstitutions.find(
                                                    institution =>
                                                        institution.id === value
                                                )!
                                            }))
                                        }}
                                    >
                                        <SelectTrigger className="flex-1 h-9 bg-white">
                                            <SelectValue placeholder="Оберіть склад" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                availableInstitutions.map(institution => (
                                                    <SelectItem key={institution.id} value={institution.id}>
                                                        {institution.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        type="number"
                                        value={locationForm.quantity}
                                        onChange={(e) => {
                                            if (+e.target.value < 1) return;
                                            setLocationForm(prev => ({
                                                ...prev,
                                                quantity: +e.target.value,
                                            }));
                                        }}
                                        className="w-28 h-9 bg-white"
                                    />
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            addLocation();
                                            setLocationForm(locationFormInitialValue);
                                        }}
                                        disabled={locationForm.institution === null}
                                        className="h-9 px-3 bg-cyan-500 hover:bg-cyan-600 text-white"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

export default SparePartsListItem;