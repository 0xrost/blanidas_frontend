import ChartCard from "@/presentation/components/tabs/statistics/charts/ChartCard.tsx";
import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts";
import type {CategoricalChartDataItem} from "@/domain/entities/statistics.ts";
import {useRandomChartColor} from "@/presentation/hooks/useRandomColorsChart.ts";
import {useMemo} from "react";
import {ChartContainer, ChartTooltip} from "@/presentation/components/ui/chart.tsx";
import {useIsMobile} from "@/presentation/hooks/useMediaQuery.ts";

interface Props { data: CategoricalChartDataItem[] }
const AverageRepairTime = ({ data }: Props) => {
    const colors = useRandomChartColor(1);
    const mapped = useMemo(() => {
        return data.map(x => ({...x, value: (x.value / 3600).toFixed(1) }));
    }, [data]);

    const isMobile = useIsMobile();
    const margin = isMobile ? ({ top: 20 }) : ({ top: 20, right: 20, bottom: 20 });

    return (
        <ChartCard showEmpty={data.length === 0} title="Середній час ремонту по центрах" subtitle="Ефективність роботи по локаціях">
            <ChartContainer config={{}}>
                <BarChart data={mapped} margin={margin}>
                    <CartesianGrid vertical={false} />
                    <XAxis hide={isMobile} dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
                    {!isMobile && (<YAxis scale="log" domain={[1, 'dataMax']} allowDataOverflow={false} />)}
                    <ChartTooltip />

                    <Bar
                        dataKey="value"
                        name="Середній час"
                        fill={colors[0]}
                        radius={[8, 8, 0, 0]}
                    >
                        <LabelList
                            position="top"
                            offset={8}
                            className="fill-foreground"
                            fontSize={12}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        </ChartCard>
    );
};

export default AverageRepairTime;