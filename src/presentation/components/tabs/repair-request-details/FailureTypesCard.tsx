import {Card} from "@/presentation/components/ui/card.tsx";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import {Checkbox} from "@/presentation/components/ui/checkbox.tsx";
import {Badge} from "@/presentation/components/ui/badge.tsx";

type FailureTypesCardProps = {
    isReadonly: boolean;
    failureTypes: FailureType[],
    selectedFailureTypeIds: number[],
    onSelectFailureType: (failureTypeId: number) => void,
    onDeselectFailureType: (failureTypeId: number) => void,
}
const FailureTypesCard = ({ isReadonly, failureTypes, selectedFailureTypeIds, onSelectFailureType, onDeselectFailureType }: FailureTypesCardProps) => {
    return (
        <Card className="bg-white border-slate-200">
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-slate-900">Типи виявлених збоїв</h3>
                    {!isReadonly &&
                        <p className="text-sm text-slate-600">Оберіть один або декілька типів поломок, які було виявлено при діагностиці</p>
                    }
                </div>
                <div className="flex flex-wrap gap-3">
                    {failureTypes.map(type => (
                        <div key={type.id} className={`flex items-start space-x-3 bg-slate-50 rounded-lg p-3 border ${!isReadonly && "border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/50"} transition-colors`}>
                            {!isReadonly &&
                                <Checkbox
                                    id={`breakdown-${type.id}`}
                                    checked={selectedFailureTypeIds.includes(type.id)}
                                    onCheckedChange={(checked: boolean) =>
                                        checked ? onSelectFailureType(type.id) : onDeselectFailureType(type.id)}
                                    className="mt-0.5"
                                />
                            }
                            <div className="flex-1">
                                <label
                                    htmlFor={`breakdown-${type.id}`}
                                    className="text-sm text-slate-900 cursor-pointer"
                                >
                                    {type.name}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedFailureTypeIds.length > 0 && !isReadonly && (
                    <div className="pt-4 border-t border-slate-200">
                        <div className="flex flex-wrap h-auto gap-2">
                            {selectedFailureTypeIds.map(id => {
                                const type = failureTypes.find(t => t.id === id);
                                return type ? (
                                    <Badge key={id} className="rounded-sm bg-cyan-100 text-cyan-700 border-cyan-200">
                                        {type.name}
                                    </Badge>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default FailureTypesCard;