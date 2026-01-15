import {Cell, Pie, PieChart, ResponsiveContainer, type TooltipProps} from "recharts";
import ChartCard from "@/presentation/components/tabs/statistics/charts/ChartCard.tsx";
import type {CategoricalChartDataItem} from "@/domain/entities/statistics.ts";
import {useRandomChartColor} from "@/presentation/hooks/useRandomColorsChart.ts";
import {useNameValueChartData} from "@/presentation/hooks/useNameValueChartData.ts";
import {ChartContainer, ChartTooltip} from "@/presentation/components/ui/chart.tsx";

const CustomPieTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;
    return (
        <div className="border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
            <div>{data.name}: {data.value}</div>
        </div>
    );
};

interface Props { data: CategoricalChartDataItem[]; }
const FailureTypeChart = ({ data }: Props) => {
    const mapped = useNameValueChartData(data);
    const colors = useRandomChartColor(data.length);

    return (
        <ChartCard showEmpty={data.length === 0} title="Найпоширеніші типи несправностей" subtitle="Розподіл за категоріями">
            <div className="flex flex-col lg:flex-row items-center">
                <ChartContainer config={{}} className="mx-auto aspect-square h-70">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<CustomPieTooltip />}
                            />
                            <Pie
                                data={mapped}
                                dataKey="value"
                                nameKey="label"
                                stroke="none"
                            >
                                {data.map((value, index) => {
                                    return <Cell key={value.label} fill={colors[index]} />
                                })}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
                <div className="space-y-2 w-full lg:w-auto">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-sm"
                                    style={{ backgroundColor: colors[index] }}
                                ></div>
                                <span title={item.label} className="text-sm truncate max-w-55 text-slate-700">{item.label}</span>
                            </div>
                            <span className="text-sm text-slate-500">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </ChartCard>
    );
};

export default FailureTypeChart;