import type {TimeLinePoint, TimeStep} from "@/domain/entities/statistics.ts";
import {CartesianGrid, LabelList, Line, LineChart, XAxis} from "recharts";
import ChartCard from "@/presentation/components/tabs/statistics/charts/ChartCard.tsx";
import {startOfDay, startOfMonth, startOfWeek, startOfYear} from "date-fns";
import {useMemo} from "react";
import {capitalizeFirstLetter} from "@/presentation/utils.ts";
import {ChartContainer, ChartTooltip} from "@/presentation/components/ui/chart.tsx";
import EmptyTable from "@/presentation/components/layouts/EmptyTable.tsx";
import {Database} from "lucide-react";

interface Props {
    data: TimeLinePoint[];
    timeStep: TimeStep;
}

const startOfFn: Record<TimeStep, (date: Date) => Date> = {
    month: startOfMonth,
    year: startOfYear,
    day: startOfDay,
    week: startOfWeek,
}

const formatFn: Record<TimeStep, (date: Date) => string> = {
    month: (date: Date) => capitalizeFirstLetter(date.toLocaleString('uk-UA', { month: "short" })),
    week: (date: Date) => date.toLocaleString('uk-UA', { month: "short", day: "numeric" }),
    day: (date: Date) => date.toLocaleString('uk-UA', { month: "short", day: "numeric" }),
    year: (date: Date) => date.toLocaleString('uk-UA', { year: "numeric" }),
}

const TimeDynamicsChart = ({ data, timeStep }: Props) => {
    const mapped = useMemo(() => {
        return data.map(x => {
            return {
                period: formatFn[timeStep](startOfFn[timeStep](x.period)),
                count: x.count
            }
        })
    }, [data, timeStep]);
    return (
        <ChartCard showEmpty={data.length === 0} title="Динаміка поломок у часі" subtitle="Динаміка поломок у часі">
            {data.length !== 0 ? (
                <ChartContainer config={{}}>
                    <LineChart
                        accessibilityLayer
                        data={mapped}
                        margin={{ left: 10, right: 10, top: 25 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="period"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            interval="preserveStartEnd"
                        />
                        <ChartTooltip />
                        <Line
                            dataKey="count"
                            name="Кількість поломок"
                            type="natural"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground "
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            ) : (
                <EmptyTable title="Наразі немає даних для відображення статистики. " icon={Database} />
            )}
        </ChartCard>
    );
};

export { TimeDynamicsChart };