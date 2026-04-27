import {Button} from "@/presentation/components/ui/button.tsx";
import {Save, Warehouse} from "lucide-react";
import LocationItem from "@/presentation/components/tabs/spare-parts/LocationItem.tsx";
import LocationForm from "@/presentation/components/tabs/spare-parts/LocationForm.tsx";
import type {UILocation} from "@/presentation/components/tabs/spare-parts/models.ts";
import type {LocationCreate} from "@/domain/models/spare-part.ts";
import {useEffect, useMemo, useState} from "react";
import type {MutationOptions} from "@/presentation/models.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";
import {errorMessages} from "@/presentation/components/tabs/spare-parts/SparePartsTab.tsx";

interface Props {
    locations: UILocation[];
    institutions: Institution[];

    save: (locations: LocationCreate[], options?: MutationOptions) => void;
}
const SparePartLocations = ({ locations, institutions, save }: Props) => {
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
    }

    const changeQuantity = (institutionId: string, newQuantity: number) => {
        setLocalLocations((prev) =>
            prev.map((location) => {
                if (location.institution.id !== institutionId) return location;
                return { ...location, quantity: newQuantity };
            }
        ));
    };

    const changeRestoredQuantity = (institutionId: string, newQuantity: number) => {
        setLocalLocations((prev) =>
            prev.map((location) => {
                if (location.institution.id !== institutionId) return location;
                return { ...location, restoredQuantity: newQuantity };
            }),
        );
    };

    const removeLocation = (institutionId: string) => {
        setLocalLocations(
            (prev) => {
                return prev.filter((location) => location.institution.id !== institutionId);
            }
        );
    }

    const addLocation = (data: UILocation) => {
        if (localLocations.some(x => x.institution.id === data.institution.id)) return;
        setLocalLocations((prev) => [...prev, data])
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center pt-2 justify-between">
                <p className="text-xs uppercase tracking-wider text-slate-600">Наявність на складах</p>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        onClick={onSave}
                        disabled={!isDirty}
                    >
                        <Save className="w-3 h-3 mr-1" />
                        Зберегти зміни
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="grid grid-cols-[minmax(0,1fr)_84px_84px_40px] gap-2 px-3 text-[11px] uppercase tracking-wider text-slate-500">
                    <span>Склади</span>
                    <span className="text-center">Всього</span>
                    <span className="text-center">Відновлені</span>
                    <span />
                </div>
                {error && <Notification type="error" message={errorMessages.locations} />}
                {localLocations.map((location) => {
                    return <LocationItem
                        key={location.institution.id}
                        location={location}
                        remove={() => removeLocation(location.institution.id)}
                        changeQuantity={(value) => changeQuantity(location.institution.id, value)}
                        changeRestoredQuantity={(value) => changeRestoredQuantity(location.institution.id, value)}
                    />
                })}
                {localLocations.length === 0 &&
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
                <LocationForm institutions={availableInstitutions} submit={addLocation} />
            </div>
        </div>
    );
};

export default SparePartLocations;