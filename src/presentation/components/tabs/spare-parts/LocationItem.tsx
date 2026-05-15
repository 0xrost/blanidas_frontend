import React from "react";
import {MapPin, Trash2} from "lucide-react";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {UILocation} from "@/presentation/components/tabs/spare-parts/models.ts";
import {useEffect} from "react";
import { useNumericInput, type NumericInputProps } from "@/presentation/hooks/useNumericInput";

interface Props {
    location: UILocation;
    mobileView?: boolean;

    remove(): void;
    changeLocation(newQuantity: number, restoredQuantity: number): void
}

const LocationItem = ({ location, remove, changeLocation, mobileView = false }: Props) => {
    const newQuantity = useNumericInput(location.newQuantity);
    const restoredQuantity = useNumericInput(location.restoredQuantity);

    useEffect(() => {
        newQuantity.reset(location.newQuantity);
        restoredQuantity.reset(location.restoredQuantity);
    }, [location]);

    const commitEdit = () => { changeLocation(newQuantity.value, restoredQuantity.value); };

    const deleteButton = (
        <Button
            size="sm"
            variant="outline"
            onClick={remove}
            className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0 justify-self-end"
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );

    if (mobileView) {
        return (
            <div className="flex items-center justify-between gap-2 py-2 px-3 border-b border-slate-200 last:border-b-0">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 leading-5 break-words">
                        {location.institution.name}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1.5">
                        <MobileQuantityField
                            label="нові"
                            colorClass="bg-blue-50 text-blue-700"
                            inputProps={newQuantity.inputProps}
                            value={newQuantity.value}
                            onCommit={commitEdit}
                        />
                        <MobileQuantityField
                            label="відновл."
                            colorClass="bg-purple-50 text-purple-700"
                            inputProps={restoredQuantity.inputProps}
                            value={restoredQuantity.value}
                            onCommit={commitEdit}
                        />
                    </div>
                </div>

                {deleteButton}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[minmax(0,1fr)_84px_84px_40px] gap-2 items-center py-2 px-3 rounded-md border border-slate-200 bg-white">
            <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <p className="text-sm font-medium text-slate-900 truncate">
                    {location.institution.name}
                </p>
            </div>

            <Input
                min={0}
                type="number"
                inputMode="numeric"
                {...newQuantity.inputProps}
                onBlur={() => { newQuantity.inputProps.onBlur?.(); commitEdit(); }}
                onKeyDown={(e) => { if (e.key === "Enter") commitEdit(); }}
                className="h-8 text-center shadow-none"
            />

            <Input
                min={0}
                type="number"
                inputMode="numeric"
                {...restoredQuantity.inputProps}
                onBlur={() => { restoredQuantity.inputProps.onBlur?.(); commitEdit(); }}
                onKeyDown={(e) => { if (e.key === "Enter") commitEdit(); }}
                className="h-8 text-center shadow-none"
            />

            {deleteButton}
        </div>
    );
};

interface MobileQuantityFieldProps {
    label: string;
    colorClass: string;
    value: number;
    inputProps: NumericInputProps;
    onCommit(): void;
}

const MobileQuantityField = ({ label, colorClass, value, inputProps, onCommit }: MobileQuantityFieldProps) => {
    const [focused, setFocused] = React.useState(false);

    return focused ? (
        <Input
            autoFocus
            min={0}
            type="number"
            inputMode="numeric"
            {...inputProps}
            onBlur={() => { inputProps.onBlur?.(); setFocused(false); onCommit(); }}
            className="h-6 w-20 text-right text-xs"
        />
    ) : (
        <button
            type="button"
            onClick={() => setFocused(true)}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-colors ${colorClass}`}
        >
            {value} {label}
        </button>
    );
};

export default LocationItem;