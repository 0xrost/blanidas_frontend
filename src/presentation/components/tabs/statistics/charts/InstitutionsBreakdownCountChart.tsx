import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts";
import type {CategoricalChartDataItem} from "@/domain/entities/statistics.ts";
import ChartCard from "@/presentation/components/tabs/statistics/charts/ChartCard.tsx";
import {ChartContainer, ChartTooltip} from "@/presentation/components/ui/chart.tsx";
import {useRandomChartColor} from "@/presentation/hooks/useRandomColorsChart.ts";
import {useIsMobile} from "@/presentation/hooks/useMediaQuery.ts";


interface Props { data: CategoricalChartDataItem[] }
const InstitutionsBreakdownCountChart = ({ data }: Props) => {
    const colors = useRandomChartColor(data.length);
    const isMobile = useIsMobile();

    const margin = isMobile ? ({ top: 20 }) : ({ top: 20, right: 20, bottom: 20 });

    return (
        <ChartCard showEmpty={data.length === 0} title="Кількість поломок по центрах" subtitle="Розподіл за медичними центрами">
            <ChartContainer config={{}}>
                <BarChart data={data} margin={margin}>
                    <CartesianGrid vertical={false} />
                    <XAxis hide={isMobile} dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
                    {!isMobile && (<YAxis scale="log" domain={[1, 'dataMax']} allowDataOverflow />)}
                    <ChartTooltip />

                    <Bar
                        dataKey="value"
                        name="Кількість поломок"
                        fill={colors[0]}
                        maxBarSize={isMobile ? 50 : 200}
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

export default InstitutionsBreakdownCountChart;
