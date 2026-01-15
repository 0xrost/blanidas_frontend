import {Card} from "@/presentation/components/ui/card.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {RefreshCw} from "lucide-react";
import type {TimeStep} from "@/domain/entities/statistics.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import {MultiSelect} from "@/presentation/components/ui/multi-select.tsx";
import {useSelectOptions} from "@/presentation/hooks/useSelectOptions.ts";
import {useValuesByKey} from "@/presentation/hooks/useValuesByKey.ts";
import DatePicker from "@/presentation/components/ui/date-picker.tsx";
import type {DateRange} from "react-day-picker";
import type {MutationOptions} from "@/presentation/models.ts";
import {Spinner} from "@/presentation/components/ui/spinner.tsx";

interface FilterPanelValues {
    timeStep: TimeStep;
    fromDate: Date;
    toDate: Date;

    institutionIds: string[];
    modelIds: string[];
    failureTypeIds: string[];
}

interface Props {
    refresh: (data: FilterPanelValues, options?: MutationOptions) => void;
    initial: FilterPanelValues;
    isLoading: boolean;

    institutions: Institution[];
    models: EquipmentModel[];
    failureTypes: FailureType[];
}

const FilterPanel = ({refresh, initial, isLoading, institutions, models, failureTypes}: Props) => {
    const [values, setValues] = useValuesByKey<FilterPanelValues>(initial);

    const institutionOptions = useSelectOptions(institutions);
    const failureTypeOptions = useSelectOptions(failureTypes);
    const modelOptions = useSelectOptions(models);

    const onRefresh = () => refresh(values);

    const onSetRange = (range: DateRange | undefined) => {
        setValues("toDate", range?.to ?? initial.toDate);
        setValues("fromDate", range?.from ?? initial.fromDate);
    }

    return (
        <Card className="bg-white border-slate-200 shadow-md">
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="flex flex-row gap-4">
                        <DatePicker setRange={onSetRange} range={{to: values.toDate, from: values.fromDate}}  />
                        <Select value={values.timeStep} onValueChange={(value: TimeStep) => setValues("timeStep", value)}>
                            <SelectTrigger className="bg-slate-100 flex-1 w-full">
                                <SelectValue placeholder="Період" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="day">День</SelectItem>
                                <SelectItem value="week">Тиждень</SelectItem>
                                <SelectItem value="month">Місяць</SelectItem>
                                <SelectItem value="year">Рік</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <MultiSelect
                            singleLine
                            content={"11"}
                            className="font-normal bg-slate-100 border-0"
                            placeholder="Усі заклади"
                            options={institutionOptions}
                            onValueChange={value => setValues("institutionIds", value)}

                        />
                    </div>

                    <div>
                        <MultiSelect
                            singleLine
                            className="font-normal bg-slate-100 border-0"
                            placeholder="Усі моделі"
                            options={modelOptions}
                            onValueChange={value => setValues("modelIds", value)}
                        />
                    </div>

                    <div>
                        <MultiSelect
                            singleLine
                            className="font-normal bg-slate-100 border-0"
                            placeholder="Усі типи помилок"
                            options={failureTypeOptions}
                            onValueChange={value => setValues("failureTypeIds", value)}
                        />
                    </div>

                    <Button
                        onClick={onRefresh}
                        disabled={isLoading}
                        className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white mt-auto flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Spinner className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                        {isLoading ? "Завантаження..." : "Оновити дані"}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default FilterPanel;
export type { FilterPanelValues };