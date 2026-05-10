import type {FailureType} from "@/domain/entities/failure-type.ts";
import {Checkbox} from "@/presentation/components/ui/checkbox.tsx";
import { AlertTriangle } from "lucide-react";

interface Props {
    isReadonly: boolean;
    failureTypes: FailureType[],
    selectedFailureTypeIds: string[],
    onSelectFailureType: (failureTypeId: string) => void,
    onDeselectFailureType: (failureTypeId: string) => void,
}
const FailureTypesCard = ({ isReadonly, failureTypes, selectedFailureTypeIds, onSelectFailureType, onDeselectFailureType }: Props) => {
    return (
        <div className="bg-white border-b">
            <p className="px-4 py-3 border-slate-200 border-b text-slate-900">Типи виявлених збоїв</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 max-h-80 overflow-y-auto">
                {failureTypes.length > 0 ? (
                    failureTypes.map(type => (
                        <label 
                            htmlFor={`breakdown-${type.id}`} 
                            key={type.id} 
                            className="gap-2 px-4 py-3 flex items-center hover:bg-slate-50 border-slate-200 sm:odd:border-r border-b"
                        >
                            {!isReadonly &&
                                <Checkbox
                                    id={`breakdown-${type.id}`}
                                    checked={selectedFailureTypeIds.includes(type.id)}
                                    onCheckedChange={(checked: boolean) => checked ? onSelectFailureType(type.id) : onDeselectFailureType(type.id)}
                                    className="border-slate-400"
                                />
                            }
                            <label htmlFor={`breakdown-${type.id}`}  className="flex-1 text-sm text-slate-900" >{type.name}</label>
                        </label>
                    ))) : (
                        <div className="col-span-2 py-8 text-center bg-slate-50">
                            <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                            <p className="text-slate-500">Типів збоїв не додано</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FailureTypesCard;