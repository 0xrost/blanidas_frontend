import type {Institution} from "@/domain/entities/institution.ts";
import type {LocationCreate} from "@/domain/models/spare-part.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import {useEffect, useMemo, useState} from "react";
import type {UILocation} from "@/presentation/components/tabs/spare-parts/models.ts";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import LocationItem from "@/presentation/components/tabs/spare-parts/LocationItem.tsx";
import LocationForm from "@/presentation/components/tabs/spare-parts/LocationForm.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Save, Warehouse} from "lucide-react";
import {errorMessages} from "@/presentation/components/tabs/spare-parts/SparePartsTab.tsx";

interface Props {
    locations: UILocation[];
    institutions: Institution[];
    save: (locations: LocationCreate[], options?: MutationOptions) => void;
}

const SparePartMobileLocations = ({locations, institutions, save}: Props) => {
    const [localLocations, setLocalLocations] = useState<UILocation[]>([]);
    const [error, setError] = useTimedError<boolean>(false, 5000);

    const usedInstitutionIds = useMemo<Set<string>>(
        () => new Set(localLocations.map(l => l.institution.id)),
        [localLocations]
    );

    const availableInstitutions = useMemo<Institution[]>(
        () => institutions.filter(i => !usedInstitutionIds.has(i.id)),
        [institutions, usedInstitutionIds]
    );

    const isDirty = useMemo(() => {
        if (localLocations.length !== locations.length) return true;

        return localLocations.some(loc =>
            !locations.some(
                orig =>
                    orig.institution.id === loc.institution.id &&
                    orig.quantity === loc.quantity &&
                    orig.restoredQuantity === loc.restoredQuantity
            )
        );
    }, [localLocations, locations]);

    useEffect(() => { setLocalLocations(locations); }, [locations]);

    const onSave = () => {
        if (!isDirty) return;
        save(localLocations.map(x => ({
            quantity: x.quantity,
            restoredQuantity: x.restoredQuantity,
            institutionId: x.institution.id,
        })), {
            onSuccess: () => setError(false),
            onError: () => setError(true),
        });
    };

    const changeQuantity = (institutionId: string, newQuantity: number) => {
        setLocalLocations((prev) =>
            prev.map((location) => {
                if (location.institution.id !== institutionId) return location;
                return {...location, quantity: newQuantity};
            })
        );
    };

    const changeRestoredQuantity = (institutionId: string, newQuantity: number) => {
        setLocalLocations((prev) =>
            prev.map((location) => {
                if (location.institution.id !== institutionId) return location;
                return {...location, restoredQuantity: newQuantity};
            }),
        );
    };

    const removeLocation = (institutionId: string) => {
        setLocalLocations((prev) => prev.filter((location) => location.institution.id !== institutionId));
    };

    const addLocation = (data: UILocation) => {
        if (localLocations.some(x => x.institution.id === data.institution.id)) return;
        setLocalLocations((prev) => [...prev, data]);
    };

    return (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 space-y-3">
            <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-wider text-slate-600">Наявність на складах</p>
                <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={onSave}
                    disabled={!isDirty}
                >
                    <Save className="w-3 h-3 mr-1" />
                    Зберегти
                </Button>
            </div>

            {error && <Notification type="error" message={errorMessages.locations} />}

            <div className="space-y-2">
                <p className="text-xs text-slate-500">Клікніть на число, щоб відредагувати</p>
                {localLocations.map((location) => (
                    <LocationItem
                        key={location.institution.id}
                        location={location}
                        remove={() => removeLocation(location.institution.id)}
                        changeQuantity={(value) => changeQuantity(location.institution.id, value)}
                        changeRestoredQuantity={(value) => changeRestoredQuantity(location.institution.id, value)}
                    />
                ))}

                {localLocations.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6 text-center bg-white border border-dashed border-slate-300 rounded">
                        <Warehouse className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-sm text-slate-700">
                            Запчастина не має складів
                        </p>
                        <p className="text-xs text-slate-500 mb-3">
                            Додайте склад, щоб керувати залишками
                        </p>
                    </div>
                )}

                <LocationForm institutions={availableInstitutions} submit={addLocation} />
            </div>
        </div>
    );
};

export default SparePartMobileLocations;

